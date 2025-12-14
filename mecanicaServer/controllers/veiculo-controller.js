const express = require("express");
const veiculoService = require("../services/veiculo-service");
const veiculoRouter = express.Router();

//POST /cliente/cadastro/veiculo - para adicionar um novo veiculo de cliente
veiculoRouter.post("/cliente/cadastro/veiculo", veiculoService.adicionaVeiculo);

//GET /veiculo/lista - para listar os veiculos já cadastrados
veiculoRouter.get("veiculo/lista", veiculoService.listaVeiculo);

//GET /veiculo/lista/pesquisa - para pesquisar por um veiculo específico
veiculoRouter.get("veiculo/lista/pesquisa", veiculoService.pesquisaVeiculo);

//PUT /veiculo/lista/edita - para editar um veiculo
veiculoRouter.put("/veiculo/lista/edita", veiculoService.editaVeiculo);

//DELETE /veiculo/lista/edita/deleta - para deletar um veiculo
veiculoRouter.delete("/veiculo/lista/edita/deleta", veiculoService.deletaVeiculo);
