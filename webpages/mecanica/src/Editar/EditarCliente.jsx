import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";

export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nascimento: "",
    cpf: "",
    rg: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    carregarCliente();
  }, [id]);

  const carregarCliente = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3030/cliente`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const clientes = Array.isArray(response.data) ? response.data : response.data.clientes || [];
      const cliente = clientes.find(c => c.id === parseInt(id));
      
      if (cliente) {
        setFormData({
          nome: cliente.nome || "",
          email: cliente.email || "",
          nascimento: cliente.nascimento
            ? new Date(cliente.nascimento).toISOString().split("T")[0]
            : "",
          cpf: cliente.cpf || "",
          rg: cliente.rg || "",
        });
      } else {
        setSnackbarMessage("Cliente não encontrado");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
      setSnackbarMessage("Erro ao carregar cliente");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3030/cliente/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Cliente atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-clientes"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      setSnackbarMessage("Erro ao atualizar cliente");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Cliente
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="Data de Nascimento"
          name="nascimento"
          type="date"
          value={formData.nascimento}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          required
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="RG"
          name="rg"
          value={formData.rg}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Atualizar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/lista-clientes")}>
          Cancelar
        </Button>
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
