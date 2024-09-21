import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Transactions from "./components/TransactionForm";
import Calendar from "./components/Calendar";
import CreditCard from "./components/CreditCardExpenses";
import Goals from "./components/FinancialGoals";
import WishList from "./components/WishList";
import Header from "./components/Header";

const App = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("Conectado ao WebSocket");
    };

    socket.onclose = () => {
      console.log("Desconectado do WebSocket");
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions ws={ws} />} />
          <Route path="/calendar" element={<Calendar ws={ws} />} />
          <Route path="/credit-card" element={<CreditCard ws={ws} />} />
          <Route path="/goals" element={<Goals ws={ws} />} />
          <Route path="/wish-list" element={<WishList ws={ws} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
