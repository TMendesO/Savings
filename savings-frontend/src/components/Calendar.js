import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Paper } from "@mui/material";
import api from "../services/api";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/calendar");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { title, description, date };
    try {
      const response = await api.post("/calendar", newEvent);
      if (response.status === 201) {
        setEvents([...events, response.data]);
        setTitle("");
        setDescription("");
        setDate("");
      }
    } catch (error) {
      console.error("Error adding event", error);
    }
  };

  return (
    <Container component={Paper}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Evento
        </Button>
      </form>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Calendar;
