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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { generateId } from "../utils/idGenerator";

export default function CadastroChamado({ chamadoEdit, onSuccess }) {
  const [formData, setFormData] = useState({
    descricao: "",
    id_Cliente: "",
    id_Veiculo: "",
    id_TPchamado: "",
  });
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [tiposChamado, setTiposChamado] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const carregarDados = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const [clientesRes, veiculosRes, tiposRes] = await Promise.all([
        axios.get("http://localhost:3030/cliente", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/veiculo", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3030/tipo_chamado", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setClientes(clientesRes.data);
      setVeiculos(veiculosRes.data);
      setTiposChamado(tiposRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    if (chamadoEdit) {
      setFormData({
        descricao: chamadoEdit.descricao || "",
        id_Cliente: chamadoEdit.id_Cliente || "",
        id_Veiculo: chamadoEdit.id_Veiculo || "",
        id_TPchamado: chamadoEdit.id_TPchamado || "",
      });
    }
  }, [chamadoEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (chamadoEdit) {
        await axios.put(
          `http://localhost:3030/chamado/${chamadoEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Chamado atualizado com sucesso!");
      } else {
        const chamadoData = {
          id: generateId(),
          ...formData,
        };
        await axios.post("http://localhost:3030/chamado", chamadoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Chamado cadastrado com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        descricao: "",
        id_Cliente: "",
        id_Veiculo: "",
        id_TPchamado: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar chamado:", error);
      setSnackbarMessage("Erro ao salvar chamado");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {chamadoEdit ? "Editar Chamado" : "Cadastrar Chamado"}
      </Typography>
      <Stack spacing={2}>
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
        <FormControl fullWidth required>
          <InputLabel>Cliente</InputLabel>
          <Select
            name="id_Cliente"
            value={formData.id_Cliente}
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
        <FormControl fullWidth required>
          <InputLabel>Veículo</InputLabel>
          <Select
            name="id_Veiculo"
            value={formData.id_Veiculo}
            onChange={handleChange}
            label="Veículo"
          >
            {veiculos.map((veiculo) => (
              <MenuItem key={veiculo.id} value={veiculo.id}>
                {veiculo.modelo} - {veiculo.placa}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel>Tipo de Chamado</InputLabel>
          <Select
            name="id_TPchamado"
            value={formData.id_TPchamado}
            onChange={handleChange}
            label="Tipo de Chamado"
          >
            {tiposChamado.map((tipo) => (
              <MenuItem key={tipo.id} value={tipo.id}>
                {tipo.descricao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {chamadoEdit ? "Atualizar" : "Cadastrar"}
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
