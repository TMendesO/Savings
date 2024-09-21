import React, { useEffect, useState } from "react";
import { getTransactions, removeTransaction } from "../services/api";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { AttachMoney, ShoppingCart } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

function TransactionList({ ws }) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      if (response) {
        setTransactions(response);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Erro ao buscar transações", error);
      setTransactions([]);
    }
  };

  const handleRemoveTransaction = async (id) => {
    try {
      await removeTransaction(id);
      fetchTransactions();
    } catch (error) {
      console.error("Error removing transaction", error);
    }
  };

  useEffect(() => {
    fetchTransactions();

    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "TRANSACTION_ADDED") {
          fetchTransactions();
        }
      };
    }
  }, [ws]);

  return (
    <Container component={Paper} style={{ marginTop: "20px" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.type === "gasto" ? (
                    <ShoppingCart color="error" />
                  ) : (
                    <AttachMoney color="success" />
                  )}
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveTransaction(transaction.ID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhuma transação encontrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
}

export default TransactionList;
