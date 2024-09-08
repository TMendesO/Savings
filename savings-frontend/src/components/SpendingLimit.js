import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { getSpendingLimit, setSpendingLimit } from "../services/api";

const SpendingLimit = ({ token }) => {
  const [limit, setLimit] = useState(0);

  const fetchSpendingLimit = async () => {
    const response = await getSpendingLimit(token);
    setLimit(response.data.limit);
  };

  useEffect(() => {
    fetchSpendingLimit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setSpendingLimit(token, limit);
    alert("Limite de gastos atualizado com sucesso");
  };

  return (
    <Paper elevation={3}>
      <Box component="form" onSubmit={handleSubmit} noValidate p={2}>
        <Typography variant="h6">Definir Limite Mensal de Gastos</Typography>
        <TextField
          fullWidth
          label="Limite de Gastos"
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </Paper>
  );
};

export default SpendingLimit;
