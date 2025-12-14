import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Stack,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function CadastroAlinhamentoFuncao({ alinhamentoEdit, onSuccess }) {
  const [formData, setFormData] = useState({
    id_funcao: "",
    id_funcionario: "",
  });
  const [funcoes, setFuncoes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const carregarDados = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const [funcoesRes, funcionariosRes] = await Promise.all([
        axios.get("http://localhost:3002/funcao", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3002/funcionario", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setFuncoes(funcoesRes.data);
      setFuncionarios(funcionariosRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    if (alinhamentoEdit) {
      setFormData({
        id_funcao: alinhamentoEdit.id_funcao || "",
        id_funcionario: alinhamentoEdit.id_funcionario || "",
      });
    }
  }, [alinhamentoEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (alinhamentoEdit) {
        await axios.put(
          `http://localhost:3002/alinhamento_funcao/${alinhamentoEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Alinhamento atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3002/alinhamento_funcao", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Alinhamento cadastrado com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        id_funcao: "",
        id_funcionario: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar alinhamento:", error);
      setSnackbarMessage("Erro ao salvar alinhamento");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {alinhamentoEdit ? "Editar Alinhamento de Função" : "Cadastrar Alinhamento de Função"}
      </Typography>
      <Stack spacing={2}>
        <FormControl fullWidth required>
          <InputLabel>Função</InputLabel>
          <Select
            name="id_funcao"
            value={formData.id_funcao}
            onChange={handleChange}
            label="Função"
          >
            {funcoes.map((funcao) => (
              <MenuItem key={funcao.id} value={funcao.id}>
                {funcao.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel>Funcionário</InputLabel>
          <Select
            name="id_funcionario"
            value={formData.id_funcionario}
            onChange={handleChange}
            label="Funcionário"
          >
            {funcionarios.map((funcionario) => (
              <MenuItem key={funcionario.id} value={funcionario.id}>
                {funcionario.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {alinhamentoEdit ? "Atualizar" : "Cadastrar"}
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
