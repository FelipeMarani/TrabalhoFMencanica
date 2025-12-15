const express = require("express");
const tpVeiculoService = require("../services/tpVeiculo-service");

const tpVeiculoRouter = express.Router();

// POST / - criar novo tipo de veículo
tpVeiculoRouter.post("/", tpVeiculoService.criaTpVeiculo);

// GET / - listar todos os tipos de veículos
tpVeiculoRouter.get("/", tpVeiculoService.listaTpVeiculo);

// GET /pesquisa - pesquisar tipo de veículo
tpVeiculoRouter.get("/pesquisa", tpVeiculoService.pesquisaTpVeiculo);

// PUT /:id - atualizar tipo de veículo
tpVeiculoRouter.put("/:id", tpVeiculoService.atualizaTpVeiculo);

// DELETE /:id - deletar tipo de veículo
tpVeiculoRouter.delete("/:id", tpVeiculoService.deletaTpVeiculo);

module.exports = tpVeiculoRouter;
