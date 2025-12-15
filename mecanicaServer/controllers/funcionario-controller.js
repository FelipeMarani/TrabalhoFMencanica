const express = require("express");
const funcionarioService = require("../services/funcionario-service");
const funcionarioRouter = express.Router();

// POST / - criar novo funcionário
funcionarioRouter.post("/", funcionarioService.novoFuncionario);

// GET / - listar todos os funcionários
funcionarioRouter.get("/", funcionarioService.listaFuncionario);

// GET /pesquisa - pesquisar funcionário
funcionarioRouter.get("/pesquisa", funcionarioService.pesquisaFuncionario);

// PUT /:id - atualizar funcionário
funcionarioRouter.put("/:id", funcionarioService.editaFuncionario);

// DELETE /:id - deletar funcionário
funcionarioRouter.delete("/:id", funcionarioService.deletafuncionario);

module.exports = funcionarioRouter;
