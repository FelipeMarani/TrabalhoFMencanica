const express = require("express");
const clienteService = require("../services/cliente-service");

const clienteRouter = express.Router();

//POST /cria/cliente - cadastrar novo cliente
clienteRouter.post("/cria/cliente", clienteService.criaCliente);

//GET /cliente/lista - retorna todos os clientes
clienteRouter.get("/cliente/lista", clienteService.retornaTodosClientes);

//GET /cliente/lista/pesquisa - retorna um cliente especifico
clienteRouter.get("/cliente/lista/pesquisa", clienteService.retornaClienteIdCpfNome)

//Put /cliente/lista/edita - atualizar cadastro do cliente
clienteRouter.put("/cliente/lista/edita", clienteService.atualizaCliente);

//DELET /cliente/lista/edita/deleta - deletar cadastro do cliente
clienteRouter.delete("/edita/cliente", clienteService.deletaCliente);

module.exports = clienteRouter;
