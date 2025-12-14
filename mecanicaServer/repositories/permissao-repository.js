const model = require("../models");

// Função para obter todas as permissões
const obterTodasPermissoes = async () => {
    return await model.Permissao.findAll();
};

// Função para obter permissão por ID
const obterPermissaoPorId = async (permissao) => {
    return await model.Permissao.findByPk(permissao.id);
};

// Função para criar uma nova permissão
const criarPermissao = async (permissao) => {
    const novaPermissao = await model.Permissao.create(permissao);
    return novaPermissao;
};

// Função para atualizar uma permissão
const atualizarPermissao = async (permissao) => {
    try {
        await model.Permissao.update(permissao, { where: { id: permissao.id } });
        return await model.Permissao.findByPk(permissao.id);
    } catch (error) {
        throw error;
    }
};

// Função para deletar uma permissão
const deletarPermissao = async (permissao) => {
    try {
        await model.Permissao.destroy({ where: { id: permissao.id } });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    obterTodasPermissoes,
    obterPermissaoPorId,
    criarPermissao,
    atualizarPermissao,
    deletarPermissao,
};
