const model = require("../models");
const { Op } = require("sequelize");

// Função para listar todos os tipos de veículo
const listaTpVeiculo = async () => {
    return await model.tpVeiculo.findAll();
};

// Função para pesquisar tipo de veículo por id ou nome
const pesquisaTpVeiculo = async (termoBusca) => {
    return await model.tpVeiculo.findAll({
        where: {
            [Op.or]: [
                { id: termoBusca },
                { nome: { [Op.iLike]: `%${termoBusca}%` } },
            ],
        },
    });
};

// Função para criar um novo tipo de veículo
const criaTpVeiculo = async (tpVeiculo) => {
    const novo = await model.tpVeiculo.create(tpVeiculo);
    return novo;
};

// Função para atualizar um tipo de veículo
const atualizaTpVeiculo = async (tpVeiculo) => {
    try {
        await model.tpVeiculo.update(tpVeiculo, { where: { id: tpVeiculo.id } });
        return await model.tpVeiculo.findByPk(tpVeiculo.id);
    } catch (error) {
        throw error;
    }
};

// Função para deletar um tipo de veículo
const deletaTpVeiculo = async (tpVeiculo) => {
    try {
        await model.tpVeiculo.destroy({ where: { id: tpVeiculo.id } });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    listaTpVeiculo,
    pesquisaTpVeiculo,
    criaTpVeiculo,
    atualizaTpVeiculo,
    deletaTpVeiculo,
};
