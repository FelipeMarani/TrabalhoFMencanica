const express = require("express");
const permissaoService = require("../services/permissao-service");

const permissaoRouter = express.Router();

//POST /permissao/nova - criar nova permissão
permissaoRouter.post("/permissao/nova", permissaoService.criaPermissao);

//GET /permissao/lista - retornar todas as permissões
permissaoRouter.get("/permissao/lista", permissaoService.retornaTodasPermissoes);

//GET /permissao/lista/pesquisa/:id - retornar uma permissão específica
permissaoRouter.get("/permissao/lista/pesquisa/:id", permissaoService.retornaPermissaoPorId);

//PUT /permissao/lista/edita/:id - atualizar uma permissão
permissaoRouter.put("/permissao/lista/edita/:id", permissaoService.atualizaPermissao);

//DELETE /permissao/lista/edita/deleta/:id - deletar uma permissão
permissaoRouter.delete("/permissao/lista/edita/deleta/:id", permissaoService.deletaPermissao);

module.exports = permissaoRouter;
