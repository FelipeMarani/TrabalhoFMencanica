import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";

export default function CadastroCliente({ clienteEdit, onSuccess }) {
  const getInitialFormData = () => {
    if (clienteEdit) {
      return {
        nome: clienteEdit.nome || "",
        email: clienteEdit.email || "",
        nascimento: clienteEdit.nascimento
          ? new Date(clienteEdit.nascimento).toISOString().split("T")[0]
          : "",
        cpf: clienteEdit.cpf || "",
        rg: clienteEdit.rg || "",
      };
    }
    return {
      nome: "",
      email: "",
      nascimento: "",
      cpf: "",
      rg: "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [clienteEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (clienteEdit) {
        await axios.put(
          `http://localhost:3002/cliente/${clienteEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Cliente atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3002/cliente", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Cliente cadastrado com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        nome: "",
        email: "",
        nascimento: "",
        cpf: "",
        rg: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      setSnackbarMessage("Erro ao salvar cliente");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {clienteEdit ? "Editar Cliente" : "Cadastrar Cliente"}
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
          {clienteEdit ? "Atualizar" : "Cadastrar"}
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
