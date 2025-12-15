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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";

export default function EditarChamado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    carregarDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Carregar dados do chamado e dropdowns em paralelo
      const [chamadoRes, clientesRes, veiculosRes, tiposRes] = await Promise.all([
        axios.get(`http://localhost:3030/chamado/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
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

      const chamado = chamadoRes.data;
      setFormData({
        descricao: chamado.descricao || "",
        id_Cliente: chamado.id_Cliente || "",
        id_Veiculo: chamado.id_Veiculo || "",
        id_TPchamado: chamado.id_TPchamado || "",
      });

      setClientes(Array.isArray(clientesRes.data) ? clientesRes.data : clientesRes.data.clientes || []);
      setVeiculos(Array.isArray(veiculosRes.data) ? veiculosRes.data : veiculosRes.data.veiculos || []);
      setTiposChamado(Array.isArray(tiposRes.data) ? tiposRes.data : tiposRes.data.tiposChamado || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setSnackbarMessage("Erro ao carregar dados do chamado");
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
        `http://localhost:3030/chamado/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage("Chamado atualizado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/lista-chamados"), 2000);
    } catch (error) {
      console.error("Erro ao atualizar chamado:", error);
      setSnackbarMessage("Erro ao atualizar chamado");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Chamado
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
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">
            Atualizar
          </Button>
          <Button variant="outlined" onClick={() => navigate("/lista-chamados")}>
            Cancelar
          </Button>
        </Stack>
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
