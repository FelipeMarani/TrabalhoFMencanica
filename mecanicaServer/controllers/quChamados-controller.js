const express = require("express");
const quChamadosService = require("../services/quChamado-service");

const quChamadosRouter = express.Router();

// POST / - criar nova fila de chamado
quChamadosRouter.post("/", quChamadosService.criaQuChamado);

// GET / - listar todos os chamados da fila
quChamadosRouter.get("/", quChamadosService.listaQuChamado);

// GET /pesquisa - pesquisar chamado na fila
quChamadosRouter.get("/pesquisa", quChamadosService.pesquisaQuChamado);

// PUT /:id - atualizar chamado na fila
quChamadosRouter.put("/:id", quChamadosService.atualizaQuChamado);

module.exports = quChamadosRouter;
