const express = require("express");
const alFuncaoService = require("../services/alFuncao-service");

const alFuncaoRouter = express.Router();

//POST / - criar novos alinhamentos de funções
alFuncaoRouter.post("/", alFuncaoService.criaAlFuncao);

//GET / - retorna todos os alinhamentos de funções cadastradas
alFuncaoRouter.get("/", alFuncaoService.listaAlFuncao);

//GET /pesquisa - retorna todos os alinhamentos de função de forma específica
alFuncaoRouter.get("/pesquisa", alFuncaoService.pesquisaAlFuncao);

//PUT /:id - atualizar os alinhamentos existentes
alFuncaoRouter.put("/:id", alFuncaoService.atualizaAlFuncao);

//DELETE /:id - deletar um alinhamento de função específico
alFuncaoRouter.delete("/:id", alFuncaoService.deletaAlFuncao);

module.exports = alFuncaoRouter;
