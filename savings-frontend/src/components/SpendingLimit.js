import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { getSpendingLimit, addSpendingLimit } from "../services/api";
import SpendingLimitList from "./SpendingLimitList";

const SpendingLimit = () => {
  const [category, setCategory] = useState("");
  const [amount, setLimit] = useState(0);
  const [period, setPeriod] = useState("");

  const fetchSpendingLimit = async () => {
    try {
      const response = await getSpendingLimit();
      setLimit(response);
    } catch (error) {
      console.error("Error fetching Spending limit", error);
    }
  };

  useEffect(() => {
    fetchSpendingLimit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && amount && period) {
      const plans = { category, amount, period };
      try {
        const data = await addSpendingLimit({
          ...plans,
          amount: parseFloat(plans.amount),
        });
        setCategory([...category, data]);
        setLimit([...amount, data]);
        setPeriod([...period, data]);
        alert("Limite de gastos atualizado com sucesso");
      } catch (error) {
        console.error("erro para cadastrar o limite de gastos", error);
      }
    }
  };

  return (
    <Paper elevation={3}>
      <Box component="form" onSubmit={handleSubmit} noValidate p={2}>
        <Typography variant="h6">Definir Limite Mensal de Gastos</Typography>
        <TextField
          fullWidth
          label="Limite de Gastos"
          type="number"
          value={amount}
          onChange={(e) => setLimit(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Categoria"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Nome do mês"
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
      <SpendingLimitList />
    </Paper>
  );
};

export default SpendingLimit;
