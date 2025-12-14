const express = require("express");
const alFuncaoService = require("../services/alFuncao-service");

const alFuncaoRouter = express.Router();

//POST /cadastro/controleFuncao - criar novos alinhamentos de funções
alFuncaoRouter.post("/cadastro/controleFuncao", alFuncaoService.criaAlFuncao);

//GET /controleFuncao/lista - retorna todos os alinhamentos de funções cadastradas
alFuncaoRouter.get("/controleFuncao/lista", alFuncaoService.listaAlFuncao);

//GET /controleFuncao/lista/pesquisa - retorna todos os alinhamentos de função de forma específica
alFuncaoRouter.get("/controleFuncao/lista/pesquisa", alFuncaoService.pesquisaAlFuncao);

//PUT /controleFuncao/lista/edita - atualizar os alinhamentos existentes
alFuncaoRouter.put("/controleFuncao/lista/edita", alFuncaoService.atualizaAlFuncao);

//DELETE /controleFuncao/lista/edita/deleta - deletar um alinhamento de função específico
alFuncaoRouter.delete("/controleFuncao/lista/edita/deleta", alFuncaoService.deletaAlFuncao);

module.exports = alFuncaoRouter;
