import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import api from "../services/api";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

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
      if (editMode) {
        await api.put(`/calendar/${currentEventId}`, newEvent);
      } else {
        const response = await api.post("/calendar", newEvent);
        if (response.status === 201) {
          setEvents([...events, response.data]);
        }
      }
      setTitle("");
      setDescription("");
      setDate("");
      setEditMode(false);
      setCurrentEventId(null);
    } catch (error) {
      console.error("Error adding/editing event", error);
    }
  };

  const handleEdit = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setEditMode(true);
    setCurrentEventId(event.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/calendar/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event", error);
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
          {editMode ? "Editar Evento" : "Adicionar Evento"}
        </Button>
      </form>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <IconButton onClick={() => handleEdit(event)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(event.ID)}>
              <Delete />
            </IconButton>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Calendar;
