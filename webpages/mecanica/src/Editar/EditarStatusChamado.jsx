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

export default function EditarStatusChamado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    descricao: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    carregarStatusChamado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const carregarStatusChamado = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3030/status_chamado/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        descricao: response.data.descricao || "",
      });
    } catch (error) {
      console.error("Erro ao carregar status de chamado:", error);
      setSnackbarMessage("Erro ao carregar dados do status de chamado");
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
        `http://localhost:3030/status_chamado/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Status de chamado atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-status-chamado"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar status de chamado:", error);
      setSnackbarMessage("Erro ao atualizar status de chamado");
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
        Editar Status de Chamado
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          fullWidth
        />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">
            Atualizar
          </Button>
          <Button variant="outlined" onClick={() => navigate("/lista-status-chamado")}>
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
