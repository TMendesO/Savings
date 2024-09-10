import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Funções para despesas do cartão de crédito
export const getCreditCardExpenses = async () => {
  try {
    const response = await api.get("/credit-card");
    return response.data;
  } catch (error) {
    console.error("Error fetching credit card expenses", error);
    throw error;
  }
};

export const getSpendingLimit = async () => {
  try {
    const response = await api.get("/spending-limit");
    return response.data;
  } catch (error) {
    console.error("Error fetching spending limit", error);
    throw error;
  }
};

export const addSpendingLimit = async (limit) => {
  try {
    const response = await api.post("/spending-limit", limit);
    return response.data;
  } catch (error) {
    console.error("Error adding spending limit", error);
    throw error;
  }
};

// Funções para metas financeiras
export const getFinancialGoals = async () => {
  try {
    const response = await api.get("/financial-goals");
    return response.data;
  } catch (error) {
    console.error("Error fetching financial goals", error);
    throw error;
  }
};

export const addFinancialGoal = async (goal) => {
  try {
    const response = await api.post("/financial-goals", goal);
    return response.data;
  } catch (error) {
    console.error("Error adding financial goal", error);
    throw error;
  }
};

export const removeFinancialGoal = async (goalId) => {
  try {
    await api.delete(`/financial-goals/${goalId}`);
  } catch (error) {
    console.error("Error removing financial goal", error);
    throw error;
  }
};

// Funções para lista de desejos
export const getWishList = async () => {
  try {
    const response = await api.get("/wish-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching wish list", error);
    throw error;
  }
};

export const addWishItem = async (item) => {
  try {
    const response = await api.post("/wish-list", item);
    return response.data;
  } catch (error) {
    console.error("Error adding wish item", error);
    throw error;
  }
};

export const removeWishItem = async (itemId) => {
  try {
    await api.delete(`/wish-list/${itemId}`);
  } catch (error) {
    console.error("Error removing wish item", error);
    throw error;
  }
};

// Funções para transações
export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction", error);
    throw error;
  }
};

export default api;
