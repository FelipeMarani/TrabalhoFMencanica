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

export default function CadastroTipoVeiculo({ tipoVeiculoEdit, onSuccess }) {
  const getInitialFormData = () => {
    if (tipoVeiculoEdit) {
      return {
        nome: tipoVeiculoEdit.nome || "",
      };
    }
    return {
      nome: "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [tipoVeiculoEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (tipoVeiculoEdit) {
        await axios.put(
          `http://localhost:3002/tipo_veiculo/${tipoVeiculoEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Tipo de veículo atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3002/tipo_veiculo", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Tipo de veículo cadastrado com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        nome: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar tipo de veículo:", error);
      setSnackbarMessage("Erro ao salvar tipo de veículo");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {tipoVeiculoEdit ? "Editar Tipo de Veículo" : "Cadastrar Tipo de Veículo"}
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
        <Button type="submit" variant="contained" color="primary">
          {tipoVeiculoEdit ? "Atualizar" : "Cadastrar"}
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
