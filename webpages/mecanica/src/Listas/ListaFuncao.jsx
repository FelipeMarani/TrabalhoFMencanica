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

export default function ListaFuncao({ onEdit }) {
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarFuncoes();
  }, []);

  const carregarFuncoes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3002/funcao", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFuncoes(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar funções:", error);
      setError("Erro ao carregar funções");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir esta função?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3002/funcao/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarFuncoes();
      } catch (error) {
        console.error("Erro ao excluir função:", error);
        setError("Erro ao excluir função");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Funções
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funcoes.map((funcao) => (
              <TableRow key={funcao.id}>
                <TableCell>{funcao.id}</TableCell>
                <TableCell>{funcao.nome}</TableCell>
                <TableCell>{funcao.descricao}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit && onEdit(funcao)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(funcao.id)}
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
