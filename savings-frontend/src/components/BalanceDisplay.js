import React, { useEffect, useState } from "react";
import api from "../services/api";

function BalanceDisplay() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/transactions");
        const transactions = response.data;
        const totalBalance = transactions.reduce((acc, transaction) => {
          return transaction.type === "Income"
            ? acc + transaction.amount
            : acc - transaction.amount;
        }, 0);
        setBalance(totalBalance);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Balance: ${balance.toFixed(2)}</h2>
    </div>
  );
}

export default BalanceDisplay;
