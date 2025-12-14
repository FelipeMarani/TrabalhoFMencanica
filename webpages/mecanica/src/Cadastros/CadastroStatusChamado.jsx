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

export default function CadastroStatusChamado({ statusChamadoEdit, onSuccess }) {
  const getInitialFormData = () => {
    if (statusChamadoEdit) {
      return {
        descricao: statusChamadoEdit.descricao || "",
      };
    }
    return {
      descricao: "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [statusChamadoEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (statusChamadoEdit) {
        await axios.put(
          `http://localhost:3002/status_chamado/${statusChamadoEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Status de chamado atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3002/status_chamado", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Status de chamado cadastrado com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        descricao: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar status de chamado:", error);
      setSnackbarMessage("Erro ao salvar status de chamado");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {statusChamadoEdit ? "Editar Status de Chamado" : "Cadastrar Status de Chamado"}
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
        <Button type="submit" variant="contained" color="primary">
          {statusChamadoEdit ? "Atualizar" : "Cadastrar"}
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
