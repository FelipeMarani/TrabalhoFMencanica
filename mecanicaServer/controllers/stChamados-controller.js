const express = require("express");
const stChamadosService = require("../services/stChamado-service");

const stChamadosRouter = express.Router();

//POST /statusChamado/adicona - adicionar um novo status de chamado
stChamadosRouter.post("/statusChamados/adicona", stChamadosService.adicionanovostatus);

//GET /statusChamado/lista - retorna todos os status de chamados cadastrados
stChamadosRouter.get("/statusChamados/lista", stChamadosService.retornaTodosStatus);

//GET /statusChamado/lista/pesquisa - retornar um status específico
stChamadosRouter.get("/listaChamados/pesquisa", stChamadosService.pesquisaStatus);

//PUT /statusChamado/lista/edita - para editar o status do chamado
stChamadosRouter.put("/statusChamados/lista/edita", stChamadosService.editaStatus);

//DELETE /statusChamado/lista/edita/deleta - para deletar um status de chamado
stChamadosRouter.delete("/statusChamados/lista/edita/deleta", stChamadosService.deletaStatus);

module.exports = stChamadosRouter;
