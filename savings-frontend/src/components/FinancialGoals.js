import React, { useState, useEffect } from "react";
import {
  getFinancialGoals,
  addFinancialGoal,
  removeFinancialGoal,
} from "../services/api";
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

const FinancialGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  const fetchGoals = async () => {
    try {
      const data = await getFinancialGoals();
      setGoals(data);
    } catch (error) {
      console.error("Error fetching financial goals", error);
    }
  };

  const handleAddGoal = async () => {
    try {
      const data = await addFinancialGoal({ description: newGoal });
      setGoals([...goals, data]);
      setNewGoal("");
    } catch (error) {
      console.error("Error adding financial goal", error);
    }
  };

  const handleRemoveGoal = async (id) => {
    try {
      await removeFinancialGoal(id);
      fetchGoals();
    } catch (error) {
      console.error("Error removing financial goal", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Metas Financeiras</Typography>
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          label="Nova Meta"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          fullWidth
        />
        <Button
          onClick={handleAddGoal}
          variant="contained"
          color="primary"
          style={{ marginLeft: "8px" }}
        >
          Adicionar
        </Button>
      </Box>
      <List>
        {goals.map((goal) => (
          <ListItem
            key={goal.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveGoal(goal.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={goal.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FinancialGoals;
