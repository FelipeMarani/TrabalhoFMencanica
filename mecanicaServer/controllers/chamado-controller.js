const express = require("express");
const ChamadoService = require("../services/chamado-service");
const quChamadosService = require("../services/quChamado-service");

const chamadoRouter = express.Router();

//POST / - criar um novo chamado
chamadoRouter.post("/", ChamadoService.novoChamado);

//GET / - listar todos os chamados da fila
chamadoRouter.get("/", quChamadosService.listaQuChamado);

//GET /pesquisa - pesquisar chamado específico
chamadoRouter.get("/pesquisa", quChamadosService.pesquisaQuChamado);

//PUT /:id - atualiza status do chamado
chamadoRouter.put("/:id", quChamadosService.atualizaQuChamado);

//DELETE /:id - deleta o chamado em aberto
chamadoRouter.delete("/:id", ChamadoService.deletaChamado);

module.exports = chamadoRouter;
