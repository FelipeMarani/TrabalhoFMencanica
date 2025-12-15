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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function EditarEndereco() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    id_funcionario: "",
  });
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
      const [enderecosRes, funcionariosRes] = await Promise.all([
        axios.get("http://localhost:3030/endereco", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/funcionario", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const enderecos = Array.isArray(enderecosRes.data) ? enderecosRes.data : enderecosRes.data.enderecos || [];
      const endereco = enderecos.find(e => e.id === parseInt(id));
      
      if (endereco) {
        setFormData({
          logradouro: endereco.logradouro || "",
          numero: endereco.numero || "",
          complemento: endereco.complemento || "",
          bairro: endereco.bairro || "",
          cidade: endereco.cidade || "",
          estado: endereco.estado || "",
          cep: endereco.cep || "",
          id_funcionario: endereco.id_funcionario || "",
        });
      } else {
        setSnackbarMessage("Endereço não encontrado");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }

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
        `http://localhost:3030/endereco/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Endereço atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-enderecos"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      setSnackbarMessage("Erro ao atualizar endereço");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Endereço
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label="Logradouro"
          name="logradouro"
          value={formData.logradouro}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="Número"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Complemento"
          name="complemento"
          value={formData.complemento}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="Bairro"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="Cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="Estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="CEP"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          fullWidth
        />
        <FormControl required fullWidth>
          <InputLabel>Funcionário</InputLabel>
          <Select
            name="id_funcionario"
            value={formData.id_funcionario}
            onChange={handleChange}
            label="Funcionário"
          >
            {funcionarios.map((func) => (
              <MenuItem key={func.id} value={func.id}>
                {func.nome} ({func.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Atualizar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/lista-enderecos")}>
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
