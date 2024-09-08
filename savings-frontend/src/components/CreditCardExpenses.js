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
} from "@mui/material";

const CreditCardExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const data = await getCreditCardExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching credit card expenses", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6" component="div" gutterBottom>
          Despesas com Cartão de Crédito
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default CreditCardExpenses;
