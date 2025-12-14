const express = require("express");
const funcionarioPermService = require("../services/funcionarioPermissao-service");

const funcionarioPermRouter = express.Router();

//POST /funcionarioPermissao/nova - adicionar nova associação funcionário-permissão
funcionarioPermRouter.post("/funcionarioPermissao/nova", funcionarioPermService.criaFuncionarioPermissao);

//GET /funcionarioPermissao/lista - retornar todas as associações
funcionarioPermRouter.get("/funcionarioPermissao/lista", funcionarioPermService.retornaTodosFuncionarioPermissoes);

//GET /funcionarioPermissao/funcionario/:email - retornar permissões de um funcionário
funcionarioPermRouter.get("/funcionarioPermissao/funcionario/:email", funcionarioPermService.retornaPermissoesPorFuncionario);

//GET /funcionarioPermissao/permissao/:id - retornar funcionários com uma permissão
funcionarioPermRouter.get("/funcionarioPermissao/permissao/:id", funcionarioPermService.retornaFuncionariosPorPermissao);

//DELETE /funcionarioPermissao/deleta - deletar associação funcionário-permissão
funcionarioPermRouter.delete("/funcionarioPermissao/deleta", funcionarioPermService.deletaFuncionarioPermissao);

module.exports = funcionarioPermRouter;
