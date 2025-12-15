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

export default function EditarVeiculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    modelo: "",
    placa: "",
    marca: "",
    id_cliente: "",
    id_tpVeiculo: "",
  });
  const [clientes, setClientes] = useState([]);
  const [tiposVeiculo, setTiposVeiculo] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    carregarDados();
  }, [id]);

  const carregarDados = async () => {
    try {
      const token = localStorage.getItem("token");
      const [veiculosRes, clientesRes, tiposRes] = await Promise.all([
        axios.get("http://localhost:3030/veiculo", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/cliente", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/tipo_veiculo", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const veiculos = Array.isArray(veiculosRes.data) ? veiculosRes.data : veiculosRes.data.veiculos || [];
      const veiculo = veiculos.find(v => v.id === parseInt(id));
      
      if (veiculo) {
        setFormData({
          modelo: veiculo.modelo || "",
          placa: veiculo.placa || "",
          marca: veiculo.marca || "",
          id_cliente: veiculo.id_cliente || "",
          id_tpVeiculo: veiculo.id_tpVeiculo || "",
        });
      } else {
        setSnackbarMessage("Veículo não encontrado");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }

      setClientes(Array.isArray(clientesRes.data) ? clientesRes.data : clientesRes.data.clientes || []);
      setTiposVeiculo(Array.isArray(tiposRes.data) ? tiposRes.data : tiposRes.data.tiposVeiculo || []);
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
        `http://localhost:3030/veiculo/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Veículo atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-veiculos"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      setSnackbarMessage("Erro ao atualizar veículo");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Veículo
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label="Modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="Placa"
          name="placa"
          value={formData.placa}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          label="Marca"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          fullWidth
        />
        <FormControl required fullWidth>
          <InputLabel>Cliente</InputLabel>
          <Select
            name="id_cliente"
            value={formData.id_cliente}
            onChange={handleChange}
            label="Cliente"
          >
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required fullWidth>
          <InputLabel>Tipo de Veículo</InputLabel>
          <Select
            name="id_tpVeiculo"
            value={formData.id_tpVeiculo}
            onChange={handleChange}
            label="Tipo de Veículo"
          >
            {tiposVeiculo.map((tipo) => (
              <MenuItem key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Atualizar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/lista-veiculos")}>
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
