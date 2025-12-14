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

export default function ListaTipoChamado({ onEdit }) {
  const [tiposChamado, setTiposChamado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarTiposChamado();
  }, []);

  const carregarTiposChamado = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3002/tipo_chamado", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTiposChamado(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar tipos de chamado:", error);
      setError("Erro ao carregar tipos de chamado");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este tipo de chamado?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3002/tipo_chamado/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarTiposChamado();
      } catch (error) {
        console.error("Erro ao excluir tipo de chamado:", error);
        setError("Erro ao excluir tipo de chamado");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Tipos de Chamado
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
            {tiposChamado.map((tipo) => (
              <TableRow key={tipo.id}>
                <TableCell>{tipo.id}</TableCell>
                <TableCell>{tipo.descricao}</TableCell>
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
