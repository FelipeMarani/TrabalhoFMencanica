const express = require("express");
const funcionarioPermService = require("../services/funcionarioPermissao-service");

const funcionarioPermRouter = express.Router();

// POST / - criar nova associação funcionário-permissão
funcionarioPermRouter.post("/", funcionarioPermService.criaFuncionarioPermissao);

// GET / - listar todas as associações
funcionarioPermRouter.get("/", funcionarioPermService.retornaTodosFuncionarioPermissoes);

// GET /usuario/:email - retornar permissões de um funcionário
funcionarioPermRouter.get("/usuario/:email", funcionarioPermService.retornaPermissoesPorFuncionario);

// GET /permissao/:id - retornar funcionários com uma permissão
funcionarioPermRouter.get("/permissao/:id", funcionarioPermService.retornaFuncionariosPorPermissao);

// DELETE / - deletar associação funcionário-permissão
funcionarioPermRouter.delete("/", funcionarioPermService.deletaFuncionarioPermissao);

module.exports = funcionarioPermRouter;
