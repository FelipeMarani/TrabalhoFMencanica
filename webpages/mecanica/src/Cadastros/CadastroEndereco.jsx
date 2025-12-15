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

export default function CadastroEndereco({ enderecoEdit, onSuccess }) {
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

  const carregarDados = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const funcionariosRes = await axios.get("http://localhost:3030/funcionario", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFuncionarios(Array.isArray(funcionariosRes.data) ? funcionariosRes.data : funcionariosRes.data.funcionarios || []);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
      setFuncionarios([]);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    if (enderecoEdit) {
      setFormData({
        logradouro: enderecoEdit.logradouro || "",
        numero: enderecoEdit.numero || "",
        complemento: enderecoEdit.complemento || "",
        bairro: enderecoEdit.bairro || "",
        cidade: enderecoEdit.cidade || "",
        estado: enderecoEdit.estado || "",
        cep: enderecoEdit.cep || "",
        id_funcionario: enderecoEdit.id_funcionario || "",
      });
    }
  }, [enderecoEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (enderecoEdit) {
        await axios.put(
          `http://localhost:3030/endereco/${enderecoEdit.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSnackbarMessage("Endereço atualizado com sucesso!");
      } else {
        const enderecoData = {
          id: generateId(),
          ...formData,
        };
        await axios.post("http://localhost:3030/endereco", enderecoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage("Endereço cadastrado com sucesso!");
      }
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        id_funcionario: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      setSnackbarMessage("Erro ao salvar endereço");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {enderecoEdit ? "Editar Endereço" : "Cadastrar Endereço"}
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
          {enderecoEdit ? "Atualizar" : "Cadastrar"}
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
