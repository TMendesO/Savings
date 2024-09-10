import React from "react";
import BalanceDisplay from "../components/BalanceDisplay";
import SpendingLimit from "../components/SpendingLimit";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <BalanceDisplay />
      <SpendingLimit />
    </div>
  );
}

export default Home;
