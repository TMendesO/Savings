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
import { getWishList } from "../services/api";
import api from "../services/api";

const WishList = ({ ws, addWishItem, removeWishItem }) => {
  const [wishList, setWishList] = useState([]);
  const [wishTitle, setWishTitle] = useState([]);
  const [wishDescription, setWishDescription] = useState([]);
  const [wishPrice, setWishPrice] = useState([]);
  const [wishPriority, setWishPriority] = useState([]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "WISH_ADDED") {
          addWishItem(message.data);
        }
      };
    }
  }, [ws, addWishItem]);

  const fetchItems = async () => {
    try {
      const data = await getWishList();
      console.log(data);
      setWishList(data);
    } catch (error) {
      console.error("Error fetching wish list", error);
    }
  };

  const handleAddWish = async (e) => {
    e.preventDefault();
    if (wishTitle && wishDescription && wishPrice && wishPriority) {
      const parsedPrice = parseFloat(wishPrice);

      const whishs = {
        title: wishTitle,
        description: wishDescription,
        price: parsedPrice,
        priority: wishPriority,
      };

      try {
        const response = await api.post("/wish-list", whishs);
        if (response.status === 200) {
          ws.send(JSON.stringify({ type: "WISH_LIST", data: response.data }));
          addWishItem(response.data);
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
      fetchItems();
    } catch (error) {
      console.error("Error removing wish item", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6" component="div" gutterBottom>
          Lista de Desejos
        </Typography>
        <form onSubmit={handleAddWish}>
          <TextField
            label="Titulo"
            value={wishTitle}
            onChange={(e) => setWishTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descrição"
            value={wishDescription}
            onChange={(e) => setWishDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Preço"
            type="number"
            value={wishPrice}
            onChange={(e) => setWishPrice(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Select
            value={wishPriority}
            fullWidth
            onChange={(e) => setWishPriority(e.target.value)}
            label="Pioridade"
          >
            <MenuItem value="alta">Alta</MenuItem>
            <MenuItem value="media">Média</MenuItem>
            <MenuItem value="baixa">baixa</MenuItem>
          </Select>
          <p></p>
          <Button type="submit" variant="contained" color="primary">
            Adicionar{" "}
          </Button>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Prioridade</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wishList.map((whish) => (
              <TableRow key={whish.id}>
                <TableCell>{whish.title}</TableCell>
                <TableCell>{whish.description}</TableCell>
                <TableCell>{whish.price}</TableCell>
                <TableCell>{whish.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default WishList;
