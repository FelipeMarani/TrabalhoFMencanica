const model = require("../models");
const { Op } = require("sequelize");


//Função para retornar todos os alinhamnetos de função
const listaAlFuncao = async () => {
    return await model.alFuncao.findAll();
};

//Função para retornar alinhamento de Função através do nome de funcionario ou nome da função exercida
const pesquisaAlFuncao = async (nomeBuscado) => {
    return await model.alFuncao.findAll(
        {
            include: [
                {
                    model: model.Funcao,
                    as: 'Funcao',
                    required: false,
                },
                {
                    model: model.Funcionario,
                    as: 'Funcionario',
                    required: false,
                }
            ],
            where: {
                [Op.or]: [
                    {
                        '$Funcionario.nome$': {
                            [Op.iLike]: `%${nomeBuscado}%`,
                        },
                    },
                    {
                        '$Funcao.nome$': {
                            [Op.iLike]: `%${nomeBuscado}%`,
                        },
                    },
                ],
            },
        }
    );
};

//Função para criar um novo alinhamento de função
const criaAlFuncao = async (alFuncao) => {
    const novoAlFuncao = await model.alFuncao.create(alFuncao);
    return novoAlFuncao;
}

//Função para atualizar um alinhamento de função
const atualizaAlFuncao = async (alFuncao) => {
    try {
        await model.alFuncao.update(alFuncao, { where: { id: alFuncao.id } });
        return await model.alFuncao.findByPk(alFuncao.id);
    } catch (error) {
        throw error;
    }
};

//Função para deletar um alinhamento entre função e funcionário
const deletaAlFuncao = async (alFuncao) => {
    try {
        await model.alFuncao.destroy({ where: { id: alFuncao.id } });
    } catch (error) {
        throw error
    };
};

module.exports = {
    listaAlFuncao,
    pesquisaAlFuncao,
    criaAlFuncao,
    atualizaAlFuncao,
    deletaAlFuncao
}
