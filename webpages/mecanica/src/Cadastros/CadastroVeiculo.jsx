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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { generateId } from "../utils/idGenerator";

export default function CadastroVeiculo({ veiculoEdit, onSuccess }) {
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

  const carregarDados = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const [clientesRes, tiposRes] = await Promise.all([
        axios.get("http://localhost:3030/cliente", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/tipo_veiculo", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setClientes(Array.isArray(clientesRes.data) ? clientesRes.data : clientesRes.data.clientes || []);
      setTiposVeiculo(Array.isArray(tiposRes.data) ? tiposRes.data : tiposRes.data.tiposVeiculo || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setClientes([]);
      setTiposVeiculo([]);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    if (veiculoEdit) {
      setFormData({
        modelo: veiculoEdit.modelo || "",
        placa: veiculoEdit.placa || "",
        marca: veiculoEdit.marca || "",
        id_cliente: veiculoEdit.id_cliente || "",
        id_tpVeiculo: veiculoEdit.id_tpVeiculo || "",
      });
    }
  }, [veiculoEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (veiculoEdit) {
        await axios.put(
          `http://localhost:3030/veiculo/${veiculoEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Veículo atualizado com sucesso!");
      } else {
        const veiculoData = {
          id: generateId(),
          ...formData,
        };
        await axios.post("http://localhost:3030/veiculo", veiculoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Veículo cadastrado com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        modelo: "",
        placa: "",
        marca: "",
        id_cliente: "",
        id_tpVeiculo: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      setSnackbarMessage("Erro ao salvar veículo");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {veiculoEdit ? "Editar Veículo" : "Cadastrar Veículo"}
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
          {veiculoEdit ? "Atualizar" : "Cadastrar"}
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
