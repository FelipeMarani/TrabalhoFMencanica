const express = require("express");
const tpVeiculoService = require("../services/tpVeiculo-service");

const tpVeiculoRouter = express.Router();

//POST /tpVeiculo/adicona - adicionar um novo tpVeiculo
tpVeiculoRouter.post("/tpVeiculo/adicona", tpVeiculoService.adicionanovotpVeiculo);

//GET /tpVeiculo/lista - retorna todos os tpVeiculo cadastrados
tpVeiculoRouter.get("/tpVeiculo/lista", tpVeiculoService.retornaTodostpVeiculo);

//GET /tpVeiculo/lista/pesquisa - retornar um tpVeiculo específico
tpVeiculoRouter.get("/tpVeiculo/lista/pesquisa", tpVeiculoService.pesquisatpVeiculo);

//PUT /tpVeiculo/lista/edita - para editar o tpVeiculo
tpVeiculoRouter.put("/tpVeiculo/lista/edita", tpVeiculoService.editatpVeiculo);

//DELETE /tpVeiculo/lista/edita/deleta - para deletar um tpVeiculo 
tpVeiculoRouter.delete("/tpVeiculo/lista/edita/deleta", tpVeiculoService.deletatpVeiculo);

module.exports = tpVeiculoRouter;
