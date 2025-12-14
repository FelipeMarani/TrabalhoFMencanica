const express = require("express");
const quChamadosService = require("../services/quChamado-service");

const quChamadosRouter = express.Router();

//POST /listaChamados/adicona - adicionar um novo chamado a fila
quChamadosRouter.post("/listaChamados/adicona", quChamadosService.adicionaChamadoFila);

//GET /listaChamados - retorna todos os chamados da fila
quChamadosRouter.get("/listaChamados", quChamadosService.listarTodaFila);

//GET /listaChamados/pesquisa- retornar um chamado da fila em específico
quChamadosRouter.get("/listaChamados/pesquisa", quChamadosService.pesquisafilaChamado);

//PUT /listaChamados/edita - para editar o status do chamado
quChamadosRouter.put("/listaChamados/edita", quChamadosService.editaStatusChamado);

module.exports = quChamadosRouter;
