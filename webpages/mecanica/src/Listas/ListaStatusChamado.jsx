import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Chip,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function ListaStatusChamado() {
  const navigate = useNavigate();
  const [statusChamados, setStatusChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarStatusChamados();
  }, []);

  const carregarStatusChamados = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3030/status_chamado", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatusChamados(Array.isArray(response.data) ? response.data : response.data.statusChamados || []);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar status de chamado:", error);
      setError("Erro ao carregar status de chamado");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este status de chamado?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3030/status_chamado/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarStatusChamados();
      } catch (error) {
        console.error("Erro ao excluir status de chamado:", error);
        setError("Erro ao excluir status de chamado");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Status de Chamado
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statusChamados.map((status) => (
              <TableRow key={status.id}>
                <TableCell>{status.id}</TableCell>
                <TableCell>
                  <Chip label={status.descricao} color="primary" variant="outlined" />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/editar-status-chamado/${status.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(status.id)}
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
