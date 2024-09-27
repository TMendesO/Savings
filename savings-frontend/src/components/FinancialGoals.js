import React, { useState, useEffect } from "react";
import { getFinancialGoals, removeFinancialGoal } from "../services/api";
import api from "../services/api";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FinancialGoals = ({ ws, addFinancialGoal }) => {
  const [goals, setGoals] = useState([]);
  const [goalsTitle, setGoalsTitle] = useState([]);
  const [goalsAmount, setGoalsAmount] = useState([]);
  const [goalsDate, setGoalsDate] = useState([]);

  const fetchGoals = async () => {
    try {
      const data = await getFinancialGoals();
      setGoals(data);
    } catch (error) {
      console.error("Error fetching financial goals", error);
    }
  };

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "TRANSACTION_ADDED") {
          addFinancialGoal(message.data);
        }
      };
    }
  }, [ws, addFinancialGoal]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (goalsTitle && goalsAmount && goalsDate) {
      const parsedAmount = parseFloat(goalsAmount);

      const expenses = {
        title: goalsTitle,
        target_date: goalsDate,
        amount: parsedAmount,
      };
      console.log(expenses);

      try {
        const response = await api.post("/financial-goals", expenses);
        if (response.status === 200) {
          ws.send(
            JSON.stringify({ type: "FINANCIAL_GOALS", data: response.data })
          );
          addFinancialGoal(response.data);
          resetForm();
        }
      } catch (error) {
        console.error("Erro ao criar a meta", error);
      }
    } else {
      console.error("Todos os campos são obrigatórios.");
    }
  };
  const resetForm = () => {
    setGoalsTitle("");
    setGoalsAmount("");
    setGoalsDate("");
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
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6" component="div" gutterBottom>
          Metas Financeiras
        </Typography>
        <form onSubmit={handleAddGoal}>
          <TextField
            label="Titulo"
            value={goalsTitle}
            onChange={(e) => setGoalsTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Valor"
            value={goalsAmount}
            onChange={(e) => setGoalsAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Data prevista"
            type="date"
            value={goalsDate}
            onChange={(e) => setGoalsDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" color="primary">
            Adicionar{" "}
          </Button>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data Prevista</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal.id}>
                <TableCell>{goal.title}</TableCell>
                <TableCell>{goal.amount}</TableCell>
                <TableCell>{goal.target_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default FinancialGoals;
