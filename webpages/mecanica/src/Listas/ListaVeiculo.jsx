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

export default function ListaVeiculo({ onEdit }) {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3030/veiculo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVeiculos(Array.isArray(response.data) ? response.data : response.data.veiculos || []);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
      setError("Erro ao carregar veículos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este veículo?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3030/veiculo/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarVeiculos();
      } catch (error) {
        console.error("Erro ao excluir veículo:", error);
        setError("Erro ao excluir veículo");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Veículos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Tipo de Veículo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {veiculos.map((veiculo) => (
              <TableRow key={veiculo.id}>
                <TableCell>{veiculo.id}</TableCell>
                <TableCell>{veiculo.modelo}</TableCell>
                <TableCell>{veiculo.placa}</TableCell>
                <TableCell>{veiculo.marca}</TableCell>
                <TableCell>
                  {veiculo.Cliente ? veiculo.Cliente.nome : veiculo.id_cliente}
                </TableCell>
                <TableCell>
                  {veiculo.TipoVeiculo ? veiculo.TipoVeiculo.nome : veiculo.id_tpVeiculo}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit && onEdit(veiculo)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(veiculo.id)}
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
