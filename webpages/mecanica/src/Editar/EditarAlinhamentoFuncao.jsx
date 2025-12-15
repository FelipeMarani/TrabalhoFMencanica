import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function EditarAlinhamentoFuncao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id_funcao: "",
    id_funcionario: "",
  });
  const [funcoes, setFuncoes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    carregarDados();
  }, [id]);

  const carregarDados = async () => {
    try {
      const token = localStorage.getItem("token");
      const [alinhamentosRes, funcoesRes, funcionariosRes] = await Promise.all([
        axios.get("http://localhost:3030/alinhamento_funcao", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/funcao", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/funcionario", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const alinhamentos = Array.isArray(alinhamentosRes.data) ? alinhamentosRes.data : alinhamentosRes.data.alFuncoes || [];
      const alinhamento = alinhamentos.find(a => a.id === parseInt(id));
      
      if (alinhamento) {
        setFormData({
          id_funcao: alinhamento.id_funcao || "",
          id_funcionario: alinhamento.id_funcionario || "",
        });
      } else {
        setSnackbarMessage("Alinhamento não encontrado");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }

      setFuncoes(Array.isArray(funcoesRes.data) ? funcoesRes.data : funcoesRes.data.funcoes || []);
      setFuncionarios(Array.isArray(funcionariosRes.data) ? funcionariosRes.data : funcionariosRes.data.funcionarios || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setSnackbarMessage("Erro ao carregar dados");
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
        `http://localhost:3030/alinhamento_funcao/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Alinhamento atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-alinhamento-funcao"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar alinhamento:", error);
      setSnackbarMessage("Erro ao atualizar alinhamento");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Alinhamento de Função
      </Typography>
      <Stack spacing={2}>
        <FormControl required fullWidth>
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
        <FormControl required fullWidth>
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
          Atualizar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/lista-alinhamento-funcao")}>
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
