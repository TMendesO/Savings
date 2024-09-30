import React, { useEffect, useState } from "react";
import api from "../services/api";

function BalanceDisplay() {
  const [balance, setBalance] = useState(0);
  const [essential, setEssential] = useState(0);
  const [goals, setGoals] = useState(0);
  const [wishes, setWishes] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/transactions");
        const transactions = response.data;
        const totalIncome = transactions
          .filter((transaction) => transaction.type === "ganho")
          .reduce((acc, transaction) => acc + transaction.amount, 0);
        const totalExpense = transactions
          .filter((transaction) => transaction.type === "gasto")
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalBalance = totalIncome - totalExpense;

        setBalance(totalBalance);
        setEssential(totalIncome * 0.5);
        setGoals(totalIncome * 0.3);
        setWishes(totalIncome * 0.2);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Balance: ${balance.toFixed(2)}</h2>
      <p>Essential: ${essential.toFixed(2)}</p>
      <p>Goals: ${goals.toFixed(2)}</p>
      <p>Wishes: ${wishes.toFixed(2)}</p>
    </div>
  );
}

export default BalanceDisplay;
