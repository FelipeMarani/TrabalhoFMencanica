import React, { useState, useEffect, useCallback } from "react";
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
import { generateId } from "../utils/idGenerator";

export default function CadastroFuncao({ funcaoEdit, onSuccess }) {
  const getInitialFormData = useCallback(() => {
    if (funcaoEdit) {
      return {
        nome: funcaoEdit.nome || "",
        descricao: funcaoEdit.descricao || "",
      };
    }
    return {
      nome: "",
      descricao: "",
    };
  }, [funcaoEdit]);

  const [formData, setFormData] = useState(getInitialFormData());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [funcaoEdit, getInitialFormData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (funcaoEdit) {
        await axios.put(
          `http://localhost:3030/funcao/${funcaoEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Função atualizada com sucesso!");
      } else {
        const funcaoData = {
          id: generateId(),
          ...formData,
        };
        await axios.post("http://localhost:3030/funcao", funcaoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Função cadastrada com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        nome: "",
        descricao: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar função:", error);
      setSnackbarMessage("Erro ao salvar função");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {funcaoEdit ? "Editar Função" : "Cadastrar Função"}
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
          {funcaoEdit ? "Atualizar" : "Cadastrar"}
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
