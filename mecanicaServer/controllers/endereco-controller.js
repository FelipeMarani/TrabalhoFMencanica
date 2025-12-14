const express = require("express");
const enderecoService = require("../services/endereco-service");

const enderecoRouter = express.Router();

//POST /cadastro/funcionario/endereco - cadastrar novo endereco para funcionário
enderecoRouter.post("/cadastro/funcionario/endereco", enderecoService.criaEndereco);

//GET /funcionario/endereco/lista - retorna todos os endereço dos funcionários
enderecoRouter.get("/funcionario/endereco", enderecoService.retornaTodosEndereco);

//GET /funcionario/endereco/lista/pesquisa - retorna um endereço específico
enderecoRouter.get("/funcionario/endereco/lista/pesquisa", enderecoService.retornaEnderecoporFuncionario);

//PUT /funcionario/endereco/lista/edita - editar o endereço de um funcionário específico
enderecoRouter.put("/funcionario/endereco/lista/edita", enderecoService.atualizaEndereco);

//DELETE /funcionario/endereco/lista/edita/deleta - acessa para deletar o endereço do funcionário
enderecoRouter.delete("/funcionario/endereco/lista/edita/deleta", enderecoService.deletaEndereco);

module.exports = enderecoRouter;
