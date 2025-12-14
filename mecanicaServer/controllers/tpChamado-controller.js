const express = require("express");
const tpChamadoService = require("../services/tpChamado-service");

const tpChamadoRouter = express.Router();

//POST /tpChamadoChamado/adicona - adicionar um novo tpChamado de chamado
tpChamadoRouter.post("/tpChamado/adicona", tpChamadoService.adicionanovotpChamado);

//GET /tpChamadoC/lista - retorna todos os tpChamado de chamados cadastrados
tpChamadoRouter.get("/tpChamado/lista", tpChamadoService.retornaTodostpChamado);

//GET /tpChamado/lista/pesquisa - retornar um tpChamado específico
tpChamadoRouter.get("/tpChamado/lista/pesquisa", tpChamadoService.pesquisatpChamado);

//PUT /tpChamado/lista/edita - para editar o tpChamado do chamado
tpChamadoRouter.put("/tpChamado/lista/edita", tpChamadoService.editatpChamado);

//DELETE /tpChamado/lista/edita/deleta - para deletar um tpChamado de chamado
tpChamadoRouter.delete("/tpChamado/lista/edita/deleta", tpChamadoService.deletatpChamado);

module.exports = tpChamadoRouter;
