import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function ListaTipoVeiculo({ onEdit }) {
  const [tiposVeiculo, setTiposVeiculo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarTiposVeiculo();
  }, []);

  const carregarTiposVeiculo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3030/tipo_veiculo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTiposVeiculo(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar tipos de veículo:", error);
      setError("Erro ao carregar tipos de veículo");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este tipo de veículo?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3030/tipo_veiculo/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarTiposVeiculo();
      } catch (error) {
        console.error("Erro ao excluir tipo de veículo:", error);
        setError("Erro ao excluir tipo de veículo");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Tipos de Veículo
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tiposVeiculo.map((tipo) => (
              <TableRow key={tipo.id}>
                <TableCell>{tipo.id}</TableCell>
                <TableCell>{tipo.nome}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit && onEdit(tipo)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(tipo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
