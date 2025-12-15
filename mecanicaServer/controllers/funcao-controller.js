const express = require("express");
const funcaoService = require("../services/funcao-service");

const funcaoRouter = express.Router();

//POST / - Criar novas funções
funcaoRouter.post("/", funcaoService.novaFuncao);

//GET / - retornar todas as funções cadastradas
funcaoRouter.get("/", funcaoService.listaFuncao);

//GET /pesquisa - retornar uma função específica
funcaoRouter.get("/pesquisa", funcaoService.pesquisaFuncao);

//PUT /:id - para editar uma função já cadastrada
funcaoRouter.put("/:id", funcaoService.editaFuncao);

//DELETE /:id - para remover a função específica
funcaoRouter.delete("/:id", funcaoService.deletaFuncao);

module.exports = funcaoRouter;
