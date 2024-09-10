import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getSpendingLimit } from "../services/api";

const SpendingLimitList = () => {
  const [limit, setLimit] = useState([]);

  useEffect(() => {
    const fetchSpendingLimit = async () => {
      try {
        const response = await getSpendingLimit();
        setLimit(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching Spending limit", error);
      }
    };
    fetchSpendingLimit();
  }, []);
  return (
    <Container component={Paper} style={{ marginTop: "20px" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Periodo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {limit.map((limit) => (
            <TableRow key={limit.id}>
              <TableCell>{limit.category}</TableCell>
              <TableCell>{limit.amount}</TableCell>
              <TableCell>{limit.period}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default SpendingLimitList;
