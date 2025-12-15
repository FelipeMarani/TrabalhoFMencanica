const model = require("../models");
const { Op } = require("sequelize");

//Função para listar todos os funcionários
const listafuncionario = async () => {
    return await model.Funcionario.findAll();
};

//função para pesquisar funcionário por id, nome, email, cpf, rg ou função
const pesquisaFuncionario = async (palavraBusca) => {
    const conditions = [
        { nome: { [Op.iLike]: `%${palavraBusca}%` } },
        { email: { [Op.iLike]: `%${palavraBusca}%` } },
        { cpf: { [Op.iLike]: `%${palavraBusca}%` } },
        { rg: { [Op.iLike]: `%${palavraBusca}%` } },
        { '$AlFuncoes.Funcao.nome$': { [Op.iLike]: `%${palavraBusca}%` } },
    ];
    
    // Só adiciona busca por ID se palavraBusca for um número válido
    if (!isNaN(palavraBusca) && Number.isInteger(Number(palavraBusca))) {
        conditions.push({ id: Number(palavraBusca) });
    }
    
    return await model.Funcionario.findAll({
        include: [
            {
                model: model.alFuncao,
                as: "AlFuncoes",
                required: false,
                include: [
                    {
                        model: model.Funcao,
                        as: "Funcao",
                        required: false,
                    },
                ],
            },
        ],
        where: {
            [Op.or]: conditions,
        },
    });
};

//Funçao para adicionar um novo funcionário
const novoFuncionario = async (funcionario) => {
    const newFuncionario = await model.Funcionario.create(funcionario);
    return newFuncionario;
};

//Função para atualizar um funcionário já existente
const editaFuncionario = async (funcionario) => {
    try {
        await model.Funcionario.update(funcionario, {where: {id: funcionario.id}});
        return await model.Funcionario.findByPk(funcionario.id);
    } catch (error) {
        throw error;
    }
};

//Função para deletar um funcionário
const deletaFuncionario = async (funcionario) => {
    try {
        await model.Funcionario.destroy({where: {id: funcionario.id}});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    listafuncionario,
    pesquisaFuncionario,
    novoFuncionario,
    editaFuncionario,
    deletaFuncionario
};
