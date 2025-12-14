const model = require("../models");
const { Op } = require("sequelize");

//função para listar todos os endereços de funcionários
const listaEnderecos = async () => {
    return await model.Endereco.findAll();
};

//função para pesquisar endereço através do nome, cpf, email, rg do funcionário
const pesquisaEndereco = async (palavraBusca) => {
    return await model.Endereco.findAll(
        {
            include: [
                {
                    model: model.Funcionario,
                    as: 'Funcionario',
                    required: false,
                },
            ],
            where: {
                [Op.or]: [
                    {
                        '$Funcionario.nome$': {
                            [Op.iLike]: `%${palavraBusca}%`,
                        },
                    },
                    {
                        '$Funcionario.cpf$': {
                            [Op.iLike]: `%${palavraBusca}%`,
                        },
                    },
                    {
                        '$Funcionario.email$': {
                            [Op.iLike]: `%${palavraBusca}%`,
                        },
                    },
                    {
                        '$Funcionario.rg$': {
                            [Op.iLike]: `%${palavraBusca}%`,
                        },
                    },
                ],
            },
        }
    );
};

//Função para criar um novo endereço
const criaEndereco = async (endereco) => {
    const newEndereco = await model.Endereco.create(endereco);
    return newEndereco;
};

//Função para atualizar um endereço
const atualizaEndereco = async (endereco) => {
    try {
        await model.Endereco.update(endereco, {where: {id: endereco.id}});
        return await model.Endereco.findByPk(endereco.id);
    } catch (error) {
        throw error
    }
};

//Função para deletar um endereço
const deletaEndereco = async (endereco) => {
    try {
        await model.Endereco.destroy({where: {id: endereco.id}});
    } catch (error) {
        throw error
    }
};


module.exports = {
    criaEndereco,
    listaEnderecos,
    pesquisaEndereco,
    atualizaEndereco,
    deletaEndereco
}
