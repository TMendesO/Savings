import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Funções CreditCard
export const getCreditCardExpenses = async () => {
  try {
    const response = await api.get("/credit-card");
    return response.data;
  } catch (error) {
    console.error("Error fetching credit card expenses", error);
    throw error;
  }
};

export const addCreditCardExpenses = async (creditCardData) => {
  try {
    const response = await api.post("/credit-card", creditCardData);
    return response.data;
  } catch (error) {
    console.error("Error adding Craedit card", error);
    throw error;
  }
};

// Funções SpendingLimit
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

// Funções FinancialGoals
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

// Funções WishList
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

// Funções Transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction", error);
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching wish list", error);
    throw error;
  }
};

export const removeTransaction = async (transactionsId) => {
  try {
    await api.delete(`/transactions/${transactionsId}`);
  } catch (error) {
    console.error("Error removing transactions", error);
    throw error;
  }
};

// Funções Calendar
export const getCalendarEvents = async () => {
  try {
    const response = await api.get("/calendar");
    return response.data;
  } catch (error) {
    console.error("Error fetching calendar events", error);
    throw error;
  }
};

export const addCalendarEvent = async (event) => {
  try {
    const response = await api.post("/calendar", event);
    return response.data;
  } catch (error) {
    console.error("Error adding calendar event", error);
    throw error;
  }
};

export const editCalendarEvent = async (eventId, updatedEvent) => {
  try {
    const response = await api.put(`/calendar/${eventId}`, updatedEvent);
    return response.data;
  } catch (error) {
    console.error("Error editing calendar event", error);
    throw error;
  }
};

export const removeCalendarEvent = async (eventId) => {
  try {
    await api.delete(`/calendar/${eventId}`);
  } catch (error) {
    console.error("Error removing calendar event", error);
    throw error;
  }
};

export default api;
