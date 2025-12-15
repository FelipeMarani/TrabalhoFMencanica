const model = require("../models");
const { Op } = require("sequelize");

//Função para listar todas as funções cadastradas
const listaFuncao = async () => {
    return await model.Funcao.findAll();
};

//Função para retornar função através do id ou nome
const pesquisaFuncao = async (nomeBuscado) => {
    const conditions = [
        {
            nome: {
                [Op.iLike]: `%${nomeBuscado}%`,
            },
        },
    ];
    
    if (!isNaN(nomeBuscado) && Number.isInteger(Number(nomeBuscado))) {
        conditions.push({ id: Number(nomeBuscado) });
    }
    
    return await model.Funcao.findAll({
        where: {
            [Op.or]: conditions,
        },
    });
};

//Função para criar um novo cargo
const novaFuncao = async (funcao) => {
    const newFuncao = await model.Funcao.create(funcao);
    return newFuncao;
};

//Função para editar o cargo desejado 
const editaFuncao = async (funcao) => {
    try {
        await model.Funcao.update(funcao, { where: { id: funcao.id } });
        return await model.Funcao.findByPk(funcao.id);

    } catch (error) {
        throw error;
    }
};

//Função para deletar um cargo
const deletaFuncao = async (funcao) => {
    try {
        await model.Funcao.destroy({ where: { id: funcao.id } });

    } catch (error) {
        throw error;
    }
}

module.exports = {
    novaFuncao,
    listaFuncao,
    pesquisaFuncao,
    editaFuncao,
    deletaFuncao
};
