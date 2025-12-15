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

export default function EditarTipoVeiculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    carregarTipoVeiculo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const carregarTipoVeiculo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3030/tipo_veiculo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        nome: response.data.nome || "",
      });
    } catch (error) {
      console.error("Erro ao carregar tipo de veículo:", error);
      setSnackbarMessage("Erro ao carregar dados do tipo de veículo");
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
        `http://localhost:3030/tipo_veiculo/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Tipo de veículo atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-tipo-veiculo"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar tipo de veículo:", error);
      setSnackbarMessage("Erro ao atualizar tipo de veículo");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Tipo de Veículo
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
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">
            Atualizar
          </Button>
          <Button variant="outlined" onClick={() => navigate("/lista-tipo-veiculo")}>
            Cancelar
          </Button>
        </Stack>
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
