import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Savings Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/transactions">
          Transações
        </Button>
        <Button color="inherit" component={Link} to="/calendar">
          Calendário
        </Button>
        <Button color="inherit" component={Link} to="/credit-card">
          Cartão de crédito
        </Button>
        <Button color="inherit" component={Link} to="/goals">
          Metas
        </Button>
        <Button color="inherit" component={Link} to="/wish-list">
          Lista de desejos
        </Button>
        <Button color="inherit"></Button>
        <Button color="inherit"></Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
