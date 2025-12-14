const express = require("express");
const quChamadosService = require("../services/quChamado-service");

const quChamadosRouter = express.Router();

//POST /listaChamados/adicona - adicionar um novo chamado a fila
funcaoRouter.post("/listaChamados/adicona", quChamadosService.adicionaChamadoFila);

//GET /listaChamados - retorna todos os chamados da fila
funcaoRouter.get("/listaChamados", quChamadosService.listarTodaFila);

//GET /listaChamados/pesquisa- retornar um chamado da fila em específico
funcaoRouter.get("/listaChamados/pesquisa", quChamadosService.pesquisafilaChamado);

//PUT /listaChamados/edita - para editar o status do chamado
funcaoRouter.put("/listaChamados/edita",quChamadosService.editaStatusChamado);

module.exports = funcaoRouter;
