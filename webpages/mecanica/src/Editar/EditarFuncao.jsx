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

export default function EditarFuncao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    carregarFuncao();
  }, [id]);

  const carregarFuncao = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3030/funcao`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const funcoes = Array.isArray(response.data) ? response.data : response.data.funcoes || [];
      const funcao = funcoes.find(f => f.id === parseInt(id));
      
      if (funcao) {
        setFormData({
          nome: funcao.nome || "",
          descricao: funcao.descricao || "",
        });
      } else {
        setSnackbarMessage("Função não encontrada");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro ao carregar função:", error);
      setSnackbarMessage("Erro ao carregar função");
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
        `http://localhost:3030/funcao/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Função atualizada com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-funcoes"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar função:", error);
      setSnackbarMessage("Erro ao atualizar função");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Função
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
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
        <Button type="submit" variant="contained" color="primary">
          Atualizar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/lista-funcoes")}>
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
