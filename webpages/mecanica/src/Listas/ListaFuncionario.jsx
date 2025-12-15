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
  Button,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function ListaFuncionario({ onEdit }) {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3030/funcionario", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFuncionarios(Array.isArray(response.data) ? response.data : response.data.funcionarios || []);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
      setError("Erro ao carregar funcionários");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este funcionário?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3030/funcionario/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarFuncionarios();
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
        setError("Erro ao excluir funcionário");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Funcionários
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>RG</TableCell>
              <TableCell>Nascimento</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funcionarios.map((funcionario) => (
              <TableRow key={funcionario.id}>
                <TableCell>{funcionario.id}</TableCell>
                <TableCell>{funcionario.nome}</TableCell>
                <TableCell>{funcionario.email}</TableCell>
                <TableCell>{funcionario.cpf}</TableCell>
                <TableCell>{funcionario.rg}</TableCell>
                <TableCell>
                  {new Date(funcionario.nascimento).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/editar-funcionario/${funcionario.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(funcionario.id)}
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
