const model = require("../models");

// Função para obter todas as associações funcionário-permissão
const obterTodosFuncionarioPermissoes = async () => {
    return await model.FuncionarioPermissao.findAll({
        include: [
            {
                model: model.Funcionario,
                as: "Funcionario",
            },
            {
                model: model.Permissao,
                as: "Permissao",
            },
        ],
    });
};

// Função para obter permissões por email do funcionário
const obterPermissoesPorFuncionario = async (email) => {
    return await model.FuncionarioPermissao.findAll({
        where: {
            email: email,
        },
        include: [
            {
                model: model.Permissao,
                as: "Permissao",
            },
        ],
    });
};

// Função para obter funcionários por ID da permissão
const obterFuncionariosPorPermissao = async (id_permissao) => {
    return await model.FuncionarioPermissao.findAll({
        where: {
            id_permissao: id_permissao,
        },
        include: [
            {
                model: model.Funcionario,
                as: "Funcionario",
            },
        ],
    });
};

// Função para criar uma nova associação funcionário-permissão
const criarFuncionarioPermissao = async (funcionarioPermissao) => {
    const novaAssociacao = await model.FuncionarioPermissao.create(funcionarioPermissao);
    return novaAssociacao;
};

// Função para deletar uma associação funcionário-permissão
const deletarFuncionarioPermissao = async (funcionarioPermissao) => {
    try {
        await model.FuncionarioPermissao.destroy({
            where: {
                email: funcionarioPermissao.email,
                id_permissao: funcionarioPermissao.id_permissao,
            },
        });
    } catch (error) {
        throw error;
    }
};

// Função para verificar se um funcionário tem uma permissão específica
const verificarPermissaoFuncionario = async (email, id_permissao) => {
    const associacao = await model.FuncionarioPermissao.findOne({
        where: {
            email: email,
            id_permissao: id_permissao,
        },
    });

    return associacao !== null;
};

module.exports = {
    obterTodosFuncionarioPermissoes,
    obterPermissoesPorFuncionario,
    obterFuncionariosPorPermissao,
    criarFuncionarioPermissao,
    deletarFuncionarioPermissao,
    verificarPermissaoFuncionario,
};
