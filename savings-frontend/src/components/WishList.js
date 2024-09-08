import React, { useState, useEffect } from "react";
import { getWishList, addWishItem, removeWishItem } from "../services/api";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const WishList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const fetchItems = async () => {
    try {
      const data = await getWishList();
      setItems(data);
    } catch (error) {
      console.error("Error fetching wish list", error);
    }
  };

  const handleAddItem = async () => {
    try {
      const data = await addWishItem({ description: newItem });
      setItems([...items, data]);
      setNewItem("");
    } catch (error) {
      console.error("Error adding wish item", error);
    }
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
    <Box>
      <Typography variant="h6">Lista de Desejos</Typography>
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          label="Novo Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          fullWidth
        />
        <Button
          onClick={handleAddItem}
          variant="contained"
          color="primary"
          style={{ marginLeft: "8px" }}
        >
          Adicionar
        </Button>
      </Box>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={item.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WishList;
