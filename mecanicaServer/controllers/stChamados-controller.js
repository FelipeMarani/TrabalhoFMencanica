const express = require("express");
const stChamadosService = require("../services/stChamado-service");

const stChamadosRouter = express.Router();

// POST / - criar novo status de chamado
stChamadosRouter.post("/", stChamadosService.criaStChamado);

// GET / - listar todos os status de chamados
stChamadosRouter.get("/", stChamadosService.listaStChamado);

// GET /pesquisa - pesquisar status de chamado
stChamadosRouter.get("/pesquisa", stChamadosService.pesquisaStChamado);

// PUT /:id - atualizar status de chamado
stChamadosRouter.put("/:id", stChamadosService.atualizaStChamado);

// DELETE /:id - deletar status de chamado
stChamadosRouter.delete("/:id", stChamadosService.deletaStChamado);

module.exports = stChamadosRouter;
