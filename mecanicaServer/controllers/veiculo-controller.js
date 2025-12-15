const express = require("express");
const veiculoService = require("../services/veiculo-service");
const veiculoRouter = express.Router();

// POST / - criar novo veículo
veiculoRouter.post("/", veiculoService.criaVeiculo);

// GET / - listar todos os veículos
veiculoRouter.get("/", veiculoService.listaVeiculo);

// GET /pesquisa - pesquisar veículo
veiculoRouter.get("/pesquisa", veiculoService.pesquisaVeiculo);

// PUT /:id - atualizar veículo
veiculoRouter.put("/:id", veiculoService.atualizaVeiculo);

// DELETE /:id - deletar veículo
veiculoRouter.delete("/:id", veiculoService.deletaVeiculo);

module.exports = veiculoRouter;
