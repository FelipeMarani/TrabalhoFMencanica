const express = require("express");
const ChamadoService = require("../services/chamado-service");
const quChamadosService = require("../services/quChamado-service");

const chamadoRouter = express.Router();

//POST / - criar um novo chamado
chamadoRouter.post("/", ChamadoService.novoChamado);

//GET / - listar todos os chamados
chamadoRouter.get("/", ChamadoService.listaChamados);

//GET /pesquisa - pesquisar chamado específico
chamadoRouter.get("/pesquisa", ChamadoService.pesquisaChamado);

//PUT /:id - atualiza chamado
chamadoRouter.put("/:id", ChamadoService.atualizaChamado);

//DELETE /:id - deleta o chamado
chamadoRouter.delete("/:id", ChamadoService.deletaChamado);

module.exports = chamadoRouter;
