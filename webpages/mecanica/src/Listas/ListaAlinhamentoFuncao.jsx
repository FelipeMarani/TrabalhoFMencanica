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

export default function ListaAlinhamentoFuncao({ onEdit }) {
  const [alinhamentos, setAlinhamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarAlinhamentos();
  }, []);

  const carregarAlinhamentos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3030/alinhamento_funcao", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlinhamentos(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar alinhamentos de função:", error);
      setError("Erro ao carregar alinhamentos de função");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este alinhamento?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3030/alinhamento_funcao/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarAlinhamentos();
      } catch (error) {
        console.error("Erro ao excluir alinhamento:", error);
        setError("Erro ao excluir alinhamento");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Alinhamentos de Função
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID Função</TableCell>
              <TableCell>ID Funcionário</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alinhamentos.map((alinhamento) => (
              <TableRow key={alinhamento.id}>
                <TableCell>{alinhamento.id}</TableCell>
                <TableCell>{alinhamento.id_funcao}</TableCell>
                <TableCell>{alinhamento.id_funcionario}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit && onEdit(alinhamento)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(alinhamento.id)}
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
