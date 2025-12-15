const express = require("express");
const clienteService = require("../services/cliente-service");

const clienteRouter = express.Router();

//POST / - cadastrar novo cliente
clienteRouter.post("/", clienteService.criaCliente);

//GET / - retorna todos os clientes
clienteRouter.get("/", clienteService.listaClientes);

//GET /pesquisa - retorna um cliente especifico
clienteRouter.get("/pesquisa", clienteService.pesquisaCliente)

//PUT /:id - atualizar cadastro do cliente
clienteRouter.put("/:id", clienteService.atualizaCliente);

//DELETE /:id - deletar cadastro do cliente
clienteRouter.delete("/:id", clienteService.deletaCliente);

module.exports = clienteRouter;
