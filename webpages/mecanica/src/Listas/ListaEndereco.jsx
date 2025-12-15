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

export default function ListaEndereco({ onEdit }) {
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarEnderecos();
  }, []);

  const carregarEnderecos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3030/endereco", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnderecos(Array.isArray(response.data) ? response.data : response.data.enderecos || []);
      setError(null);
    } catch (error) {
      console.error("Erro ao carregar endereços:", error);
      setError("Erro ao carregar endereços");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este endereço?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3030/endereco/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        carregarEnderecos();
      } catch (error) {
        console.error("Erro ao excluir endereço:", error);
        setError("Erro ao excluir endereço");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Endereços
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Logradouro</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Complemento</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell>Funcionário</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enderecos.map((endereco) => (
              <TableRow key={endereco.id}>
                <TableCell>{endereco.id}</TableCell>
                <TableCell>{endereco.logradouro}</TableCell>
                <TableCell>{endereco.numero}</TableCell>
                <TableCell>{endereco.complemento}</TableCell>
                <TableCell>{endereco.bairro}</TableCell>
                <TableCell>{endereco.cidade}</TableCell>
                <TableCell>{endereco.estado}</TableCell>
                <TableCell>{endereco.cep}</TableCell>
                <TableCell>
                  {endereco.Funcionario ? endereco.Funcionario.nome : endereco.id_funcionario}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit && onEdit(endereco)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(endereco.id)}
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
