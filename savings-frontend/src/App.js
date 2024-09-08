import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Button } from "@mui/material";
import Home from "./pages/Home";
import Transactions from "./components/TransactionForm";
import Calendar from "./components/Calendar";
import CreditCard from "./components/CreditCardExpenses";
import Goals from "./components/FinancialGoals";
import WishList from "./components/WishList";
import Header from "./components/Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Button
          onClick={toggleDarkMode}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/credit-card" element={<CreditCard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/wish-list" element={<WishList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
