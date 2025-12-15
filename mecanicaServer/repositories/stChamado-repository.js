const model = require("../models");
const { Op } = require("sequelize");

// Função para listar todos os status de chamado
const listaStChamado = async () => {
    return await model.stChamado.findAll();
};

// Função para pesquisar status por id ou descrição
const pesquisaStChamado = async (termoBusca) => {
    const conditions = [
        { descricao: { [Op.iLike]: `%${termoBusca}%` } },
    ];
    
    if (!isNaN(termoBusca) && Number.isInteger(Number(termoBusca))) {
        conditions.push({ id: Number(termoBusca) });
    }
    
    return await model.stChamado.findAll({
        where: {
            [Op.or]: conditions,
        },
    });
};

// Função para criar um novo status de chamado
const criaStChamado = async (stChamado) => {
    const novo = await model.stChamado.create(stChamado);
    return novo;
};

// Função para atualizar um status de chamado
const atualizaStChamado = async (stChamado) => {
    try {
        await model.stChamado.update(stChamado, { where: { id: stChamado.id } });
        return await model.stChamado.findByPk(stChamado.id);
    } catch (error) {
        throw error;
    }
};

// Função para deletar um status de chamado
const deletaStChamado = async (stChamado) => {
    try {
        await model.stChamado.destroy({ where: { id: stChamado.id } });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    listaStChamado,
    pesquisaStChamado,
    criaStChamado,
    atualizaStChamado,
    deletaStChamado,
};
