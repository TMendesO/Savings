import React, { useState, useEffect } from "react";
import { getCreditCardExpenses } from "../services/api";
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
import api from "../services/api";

const CreditCardExpenses = ({ addCreditCardExpenses, ws }) => {
  const [expenses, setExpenses] = useState([]);
  const [bank, setBank] = useState("");
  const [expiration, setExpiration] = useState("");
  const [limit, setLimit] = useState("");
  const [value, setValue] = useState("");

  const fetchExpenses = async () => {
    try {
      const data = await getCreditCardExpenses();
      console.log(data);
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching credit card expenses", error);
    }
  };

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "TRANSACTION_ADDED") {
          addCreditCardExpenses(message.data);
        }
      };
    }
  }, [ws, addCreditCardExpenses]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bank && expiration && limit && value) {
      const parsedLimit = parseFloat(limit);
      const parsedValue = parseFloat(value);
      const balance = parsedLimit - parsedValue;

      const expenses = {
        bank,
        expiration,
        limit: parsedLimit,
        value: parsedValue,
        balance,
      };

      try {
        const response = await api.post("/credit-card", expenses);
        if (response.status === 200) {
          ws.send(
            JSON.stringify({ type: "CREDIT_CARD_ADDED", data: response.data })
          );
          addCreditCardExpenses(response.data);
          resetForm();
        }
      } catch (error) {
        console.error("Erro ao criar o cartão", error);
      }
    } else {
      console.error("Todos os campos são obrigatórios.");
    }
  };

  const resetForm = () => {
    setBank("");
    setExpiration("");
    setLimit("");
    setValue("");
  };

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6" component="div" gutterBottom>
          Cartão de Crédito
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Banco/Bandeira"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Data de vencimento"
            type="date"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Limite"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Valor da fatura"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Adicionar Cartão
          </Button>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Banco/Bandeira</TableCell>
              <TableCell>Data de vencimento</TableCell>
              <TableCell>Limite</TableCell>
              <TableCell>Valor da fatura</TableCell>
              <TableCell>Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.bank}</TableCell>
                <TableCell>{expense.expiration}</TableCell>
                <TableCell>{expense.limit}</TableCell>
                <TableCell>{expense.value}</TableCell>
                <TableCell>{expense.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default CreditCardExpenses;
