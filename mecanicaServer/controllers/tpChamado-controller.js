const express = require("express");
const tpChamadoService = require("../services/tpChamado-service");

const tpChamadoRouter = express.Router();

// POST / - criar novo tipo de chamado
tpChamadoRouter.post("/", tpChamadoService.criaTpChamado);

// GET / - listar todos os tipos de chamados
tpChamadoRouter.get("/", tpChamadoService.listaTpChamado);

// GET /pesquisa - pesquisar tipo de chamado
tpChamadoRouter.get("/pesquisa", tpChamadoService.pesquisaTpChamado);

// PUT /:id - atualizar tipo de chamado
tpChamadoRouter.put("/:id", tpChamadoService.atualizaTpChamado);

// DELETE /:id - deletar tipo de chamado
tpChamadoRouter.delete("/:id", tpChamadoService.deletaTpChamado);

module.exports = tpChamadoRouter;
