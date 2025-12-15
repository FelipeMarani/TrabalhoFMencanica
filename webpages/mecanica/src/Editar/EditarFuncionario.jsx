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

export default function EditarFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    nascimento: "",
    cpf: "",
    rg: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    carregarFuncionario();
  }, [id]);

  const carregarFuncionario = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3030/funcionario`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const funcionarios = Array.isArray(response.data) ? response.data : response.data.funcionarios || [];
      const funcionario = funcionarios.find(f => f.id === parseInt(id));
      
      if (funcionario) {
        setFormData({
          nome: funcionario.nome || "",
          email: funcionario.email || "",
          senha: "",
          nascimento: funcionario.nascimento
            ? new Date(funcionario.nascimento).toISOString().split("T")[0]
            : "",
          cpf: funcionario.cpf || "",
          rg: funcionario.rg || "",
        });
      } else {
        setSnackbarMessage("Funcionário não encontrado");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro ao carregar funcionário:", error);
      setSnackbarMessage("Erro ao carregar funcionário");
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
        `http://localhost:3030/funcionario/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Funcionário atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-funcionarios"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      setSnackbarMessage("Erro ao atualizar funcionário");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Funcionário
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
          label="Senha (deixe em branco para manter a atual)"
          name="senha"
          type="password"
          value={formData.senha}
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
        <Button variant="outlined" onClick={() => navigate("/lista-funcionarios")}>
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
