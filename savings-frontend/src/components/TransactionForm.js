import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Stack,
} from "@mui/material";
import TransactionList from "./TransactionList";
import api from "../services/api";

function TransactionForm({ onTransactionAdded, ws }) {
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "TRANSACTION_ADDED") {
          onTransactionAdded(message.data);
        }
      };
    }
  }, [ws, onTransactionAdded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      amount &&
      description &&
      date &&
      transactionType &&
      status &&
      transactionType === "gasto"
    ) {
      const transaction = {
        amount,
        description,
        date,
        type: transactionType,
        status,
      };
      try {
        const response = await api.post("/transactions", {
          ...transaction,
          amount: parseFloat(transaction.amount),
        });
        if (response.status === 200) {
          ws.send(
            JSON.stringify({ type: "TRANSACTION_ADDED", data: response.data })
          );
          onTransactionAdded(response.data);
          resetForm();
        }
      } catch (error) {
        console.error("Erro ao criar transação", error);
      }
    } else if (
      amount &&
      description &&
      date &&
      transactionType &&
      transactionType === "ganho"
    ) {
      const transaction = {
        amount,
        description,
        date,
        type: transactionType,
      };
      try {
        const response = await api.post("/transactions", {
          ...transaction,
          amount: parseFloat(transaction.amount),
        });
        if (response.status === 200) {
          ws.send(
            JSON.stringify({ type: "TRANSACTION_ADDED", data: response.data })
          );
          onTransactionAdded(response.data);
          resetForm();
        }
      } catch (error) {
        console.error("Erro ao criar transação", error);
      }
    } else {
      console.error("Todos os campos são obrigatórios.");
    }
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setDate("");
    setStatus("");
    setTransactionType("");
  };

  return (
    <Container maxWidth="sm">
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="transaction-type-label">Tipo de Transação</InputLabel>
        <Select
          labelId="transaction-type-label"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          label="Tipo de Transação"
        >
          <MenuItem value="gasto">Gasto</MenuItem>
          <MenuItem value="ganho">Ganho</MenuItem>
        </Select>
      </FormControl>

      {transactionType && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Valor"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                type="number"
              />
              <TextField
                label="Data"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            {transactionType === "gasto" && (
              <TextField
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Adicionar {transactionType === "gasto" ? "Gasto" : "Ganho"}
            </Button>
          </Stack>
        </form>
      )}

      <TransactionList />
    </Container>
  );
}

export default TransactionForm;
