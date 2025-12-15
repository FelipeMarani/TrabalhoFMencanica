const express = require("express");
const permissaoService = require("../services/permissao-service");

const permissaoRouter = express.Router();

//POST / - criar nova permissão
permissaoRouter.post("/", permissaoService.criaPermissao);

//GET / - retornar todas as permissões
permissaoRouter.get("/", permissaoService.retornaTodasPermissoes);

//GET /pesquisa/:id - retornar uma permissão específica
permissaoRouter.get("/pesquisa/:id", permissaoService.retornaPermissaoPorId);

//PUT /:id - atualizar uma permissão
permissaoRouter.put("/:id", permissaoService.atualizaPermissao);

//DELETE /:id - deletar uma permissão
permissaoRouter.delete("/:id", permissaoService.deletaPermissao);

module.exports = permissaoRouter;

module.exports = permissaoRouter;
