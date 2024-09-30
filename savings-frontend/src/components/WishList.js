import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getWishList, addWishItem, removeWishItem } from "../services/api";

const WishList = ({ ws }) => {
  const [wishList, setWishList] = useState([]);
  const [wishTitle, setWishTitle] = useState("");
  const [wishDescription, setWishDescription] = useState("");
  const [wishPrice, setWishPrice] = useState("");
  const [wishPriority, setWishPriority] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getWishList();
        setWishList(data);
      } catch (error) {
        console.error("Error fetching wish list", error);
      }
    };

    fetchItems();

    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "WISH_ADDED") {
          setWishList((prev) => [...prev, message.data]);
        }
      };
    }
  }, [ws]);

  const handleAddWish = async (e) => {
    e.preventDefault();
    if (wishTitle && wishDescription && wishPrice && wishPriority) {
      const parsedPrice = parseFloat(wishPrice);
      const wish = {
        title: wishTitle,
        description: wishDescription,
        price: parsedPrice,
        priority: wishPriority,
      };

      try {
        const response = await addWishItem(wish);
        if (response.status === 200) {
          ws.send(JSON.stringify({ type: "WISH_ADDED", data: response.data }));
          setWishList((prev) => [...prev, response.data]);
          resetForm();
        }
      } catch (error) {
        console.error("Erro ao adicionar item a lista", error);
      }
    } else {
      console.error("Todos os campos são obrigatórios.");
    }
  };

  const resetForm = () => {
    setWishTitle("");
    setWishDescription("");
    setWishPrice("");
    setWishPriority("");
  };

  const handleRemoveItem = async (id) => {
    try {
      await removeWishItem(id);
      setWishList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing wish item", error);
    }
  };

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6" component="h3" gutterBottom>
          Lista de Desejos
        </Typography>
        <form onSubmit={handleAddWish}>
          <TextField
            fullWidth
            margin="normal"
            label="Título"
            type="text"
            value={wishTitle}
            onChange={(e) => setWishTitle(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descrição"
            type="text"
            value={wishDescription}
            onChange={(e) => setWishDescription(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Preço"
            type="number"
            value={wishPrice}
            onChange={(e) => setWishPrice(e.target.value)}
          />
          <Select
            fullWidth
            value={wishPriority}
            onChange={(e) => setWishPriority(e.target.value)}
            displayEmpty
            margin="normal"
          >
            <MenuItem value="" disabled>
              Prioridade
            </MenuItem>
            <MenuItem value="high">Alta</MenuItem>
            <MenuItem value="medium">Média</MenuItem>
            <MenuItem value="low">Baixa</MenuItem>
          </Select>
          <Box mt={2}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Adicionar Desejo
            </Button>
          </Box>
        </form>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Prioridade</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wishList.map((wish) => (
            <TableRow key={wish.id}>
              <TableCell>{wish.title}</TableCell>
              <TableCell>{wish.description}</TableCell>
              <TableCell>{wish.price}</TableCell>
              <TableCell>{wish.priority}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveItem(wish.ID)}
                >
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default WishList;
