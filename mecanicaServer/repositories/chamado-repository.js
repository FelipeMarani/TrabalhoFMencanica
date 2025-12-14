const model = require("../models");
const { Op } = require("sequelize");

//Função para obter todos os chamados cadastrados
const listaChamados = async () => {
    return await model.Chamado.findAll();
};

//Função para pesquisar por um chamado específico através do nome do cliente, CPF, email ou placa do veículo
const pesquisaChamado = async (palavraBusca) => {
    return await model.Chamado.findAll({
        include: [
            {
                model: model.Cliente,
                as: 'Cliente',
                required: false,
            },
            {
                model: model.Veiculo,
                as: 'Veiculo',
                required: false,
            }
        ],
        where: {
            [Op.or]: [
                {
                    '$Cliente.nome$': {
                        [Op.iLike]: `%${palavraBusca}%`,
                    },
                },
                {
                    '$Cliente.cpf$': {
                        [Op.iLike]: `%${palavraBusca}%`,
                    },
                },
                {
                    '$Cliente.email$': {
                        [Op.iLike]: `%${palavraBusca}%`,
                    },
                },
                {
                    '$Veiculo.placa$': {
                        [Op.iLike]: `%${palavraBusca}%`,
                    },
                },
            ],
        },
    });
}

//Função para criar um novo chamado
const novoChamado = async (chamado) => {
    const newChamado = await model.Chamado.create(chamado);
    return newChamado;
};

//Função para atualizar um chamado
const atualizaChamado = async (chamado) => {
    try {
        await model.Chamado.update(chamado, { where: { id: chamado.id } });
        return await model.Chamado.findByPk(chamado.id);
    } catch (error) {
        throw error;
    }
};

//Não há função para deletar um chamado pois seguindo a regra de negócio o mesmo só será considerado atendido e por fim encerrado, mas nunca deletado do banco

module.exports = {
    listaChamados,
    pesquisaChamado,
    novoChamado,
    atualizaChamado
};
