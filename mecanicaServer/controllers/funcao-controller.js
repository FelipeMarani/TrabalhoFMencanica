const express = require("express");
const funcaoService = require("../services/funcao-service");

const funcaoRouter = express.Router();

//POST /funcao/novafuncao - Criar novas funções
funcaoRouter.post("/funcao/novafuncao", funcaoService.novaFuncao);

//GET /funcao/lista - retornar todas as funções cadastradas
funcaoRouter.get("/funcao/lista", funcaoService.retornarTodasFuncoes);

//GET /funcao/lista/pesquisa - retornar uma função específica
funcaoRouter.get("/funcao/lista/pesquisa", funcaoService.retornaFuncaoEspecifica);

//PUT /funcao/lista/edita - para editar uma função já cadastrada
funcaoRouter.put("/funcao/lista/edita", funcaoService.editaFuncao);

//DELETE /funcao/lista/edita/deleta - para remover a função específica
funcaoRouter.delete("/funcao/lista/edita/deleta", funcaoService.deletaFuncao);

module.exports = funcaoRouter;
