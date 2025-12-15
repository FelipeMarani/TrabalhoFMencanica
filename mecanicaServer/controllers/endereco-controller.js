const express = require("express");
const enderecoService = require("../services/endereco-service");

const enderecoRouter = express.Router();

//POST / - cadastrar novo endereco para funcionário
enderecoRouter.post("/", enderecoService.criaEndereco);

//GET / - retorna todos os endereço dos funcionários
enderecoRouter.get("/", enderecoService.listaEnderecos);

//GET /pesquisa - retorna um endereço específico
enderecoRouter.get("/pesquisa", enderecoService.pesquisaEndereco);

//PUT /:id - editar o endereço de um funcionário específico
enderecoRouter.put("/:id", enderecoService.atualizaEndereco);

//DELETE /:id - acessa para deletar o endereço do funcionário
enderecoRouter.delete("/:id", enderecoService.deletaEndereco);

module.exports = enderecoRouter;
