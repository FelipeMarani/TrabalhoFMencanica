const express = require("express");
const ChamadoService = require("../services/chamado-service");
const quChamadosService = require("../services/quChamado-service");

const chamadoRouter = express.Router();
const quChamadoRouter = express.Router();

//POST /chamado/novo - criar um novo chamado
chamadoRouter.post("/chamado/novo", ChamadoService.criaNovoChamado);

//GET /chamado/lista - listar todos os chamados da fila
chamadoRouter.get("/chamado/lista", quChamadosService.retornaTodosChamados);

//GET /chamado/lista/pesquisa - pesquisar chamado específico
quChamadoRouter.get("/chamado/lista/pesquisa", quChamadosService.retornaChamadoEspecifico);

//PUT /chamado/lista/status - atualiza status do chamado
quChamadoRouter.put("/chamado/lista/edita", quChamadosService.atualizaChamado);

//DELETE /chamado/lista/edita/deleta - deleta o chamado em aberto
chamadoRouter.delete("/chamado/lista/edita/deleta", ChamadoService.deletaChamado);

module.exports = chamadoRouter;
