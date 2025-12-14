const model = require("../models");
const { Op } = require("sequelize");

// Função para listar todos os veículos
const listaVeiculo = async () => {
    return await model.Veiculo.findAll({
        include: [
            { model: model.Cliente, as: "Cliente", required: false },
            { model: model.tpVeiculo, as: "TipoVeiculo", required: false },
        ],
    });
};

// Função para pesquisar veículo por nome do cliente, tipo, modelo, marca ou id do cliente
const pesquisaVeiculo = async (termoBusca) => {
    return await model.Veiculo.findAll({
        include: [
            { model: model.Cliente, as: "Cliente", required: false },
            { model: model.tpVeiculo, as: "TipoVeiculo", required: false },
        ],
        where: {
            [Op.or]: [
                { "$Cliente.nome$": { [Op.iLike]: `%${termoBusca}%` } },
                { "$TipoVeiculo.nome$": { [Op.iLike]: `%${termoBusca}%` } },
                { modelo: { [Op.iLike]: `%${termoBusca}%` } },
                { marca: { [Op.iLike]: `%${termoBusca}%` } },
                { id_cliente: termoBusca },
            ],
        },
    });
};

// Função para criar um novo veículo
const criaVeiculo = async (veiculo) => {
    const novo = await model.Veiculo.create(veiculo);
    return novo;
};

// Função para atualizar um veículo
const atualizaVeiculo = async (veiculo) => {
    try {
        await model.Veiculo.update(veiculo, { where: { id: veiculo.id } });
        return await model.Veiculo.findByPk(veiculo.id);
    } catch (error) {
        throw error;
    }
};

// Função para deletar um veículo
const deletaVeiculo = async (veiculo) => {
    try {
        await model.Veiculo.destroy({ where: { id: veiculo.id } });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    listaVeiculo,
    pesquisaVeiculo,
    criaVeiculo,
    atualizaVeiculo,
    deletaVeiculo,
};
