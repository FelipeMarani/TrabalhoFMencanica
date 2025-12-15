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
  Chip,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from "@mui/icons-material";

export default function ListaChamado({ onEdit }) {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarChamados();
  }, []);

  const carregarChamados = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3030/chamado", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChamados(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar chamados:", error);
      setError("Erro ao carregar chamados");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este chamado?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3030/chamado/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarChamados();
      } catch (error) {
        console.error("Erro ao excluir chamado:", error);
        setError("Erro ao excluir chamado");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Chamados
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Veículo</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chamados.map((chamado) => (
              <TableRow key={chamado.id}>
                <TableCell>{chamado.id}</TableCell>
                <TableCell>{chamado.descricao}</TableCell>
                <TableCell>{chamado.id_Cliente}</TableCell>
                <TableCell>{chamado.id_Veiculo}</TableCell>
                <TableCell>
                  <Chip label={chamado.id_TPchamado} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit && onEdit(chamado)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(chamado.id)}
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
