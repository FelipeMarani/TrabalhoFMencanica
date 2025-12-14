const model = require("../models");
const { Op } = require("sequelize");

// Função para listar todos os tipos de chamado
const listaTpChamado = async () => {
    return await model.tpChamado.findAll();
};

// Função para pesquisar tipo de chamado por id ou descrição
const pesquisaTpChamado = async (termoBusca) => {
    return await model.tpChamado.findAll({
        where: {
            [Op.or]: [
                { id: termoBusca },
                { descricao: { [Op.iLike]: `%${termoBusca}%` } },
            ],
        },
    });
};

// Função para criar um novo tipo de chamado
const criaTpChamado = async (tpChamado) => {
    const novo = await model.tpChamado.create(tpChamado);
    return novo;
};

// Função para atualizar um tipo de chamado
const atualizaTpChamado = async (tpChamado) => {
    try {
        await model.tpChamado.update(tpChamado, { where: { id: tpChamado.id } });
        return await model.tpChamado.findByPk(tpChamado.id);
    } catch (error) {
        throw error;
    }
};

// Função para deletar um tipo de chamado
const deletaTpChamado = async (tpChamado) => {
    try {
        await model.tpChamado.destroy({ where: { id: tpChamado.id } });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    listaTpChamado,
    pesquisaTpChamado,
    criaTpChamado,
    atualizaTpChamado,
    deletaTpChamado,
};
