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

export default function CadastroFuncionario({ funcionarioEdit, onSuccess }) {
  const getInitialFormData = () => {
    if (funcionarioEdit) {
      return {
        nome: funcionarioEdit.nome || "",
        email: funcionarioEdit.email || "",
        senha: "",
        nascimento: funcionarioEdit.nascimento
          ? new Date(funcionarioEdit.nascimento).toISOString().split("T")[0]
          : "",
        cpf: funcionarioEdit.cpf || "",
        rg: funcionarioEdit.rg || "",
      };
    }
    return {
      nome: "",
      email: "",
      senha: "",
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
  }, [funcionarioEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (funcionarioEdit) {
        await axios.put(
          `http://localhost:3030/funcionario/${funcionarioEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Funcionário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3030/funcionario", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Funcionário cadastrado com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        nome: "",
        email: "",
        senha: "",
        nascimento: "",
        cpf: "",
        rg: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
      setSnackbarMessage("Erro ao salvar funcionário");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {funcionarioEdit ? "Editar Funcionário" : "Cadastrar Funcionário"}
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
          required={!funcionarioEdit}
          label="Senha"
          name="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
          fullWidth
          helperText={funcionarioEdit ? "Deixe em branco para manter a senha atual" : ""}
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
          {funcionarioEdit ? "Atualizar" : "Cadastrar"}
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
