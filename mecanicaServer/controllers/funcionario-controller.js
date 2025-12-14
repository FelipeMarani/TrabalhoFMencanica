const express = require("express");
const funcionarioService = require("../services/funcionario-service");
const funcionarioRouter = express.Router();

//POST /funcionario/cadastro - adicionar novo funcionário
funcionarioRouter.post("/funcionario/cadastro", funcionarioService.novoFuncionario);

//GET /funcionario/lista - retornar todos os funcionários do banco
funcionarioRouter.get("/funcionario/lista", funcionarioService.listaFuncionario);

//GET /funcionario/lista/pesquisa - retorna funcionários de uma pesquisa especifica
funcionarioRouter.get("/funcionario/lista/pesquisa", funcionarioService.pesquisaFuncionario);

//PUT /funcionario/lista/edita - para editar um funcionário específico
funcionarioRouter.put("/funcionario/lista/edita", funcionarioService.editaFuncionario);

//DELETE /funcionario/lista/edita/deleta - para deletar um funcionário específico
funcionarioRouter.delete("/funcionario/lista/edita/deleta", funcionarioService.deletafuncionario);

module.exports = funcionarioRouter;
