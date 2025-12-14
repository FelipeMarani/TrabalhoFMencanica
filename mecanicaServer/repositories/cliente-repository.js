const model = require("../models");
const { Op } = require("sequelize");

//função para listar todos os clientes
const listaClientes = async () => {
    return await model.Cliente.findAll();
};

//Função para pesquisar por Cliente através de id, cpf, email, nome ou rg
const pesquisaCliente = async (palavraBusca) => {
    return await model.Cliente.findAll({
        where: {
            [Op.or]: [
                {
                    nome: {
                        [Op.iLike]: `%${palavraBusca}%`,
                    },
                },
                {
                    cpf: {
                        [Op.iLike]: `%${palavraBusca}%`,
                    },
                },
                {
                    email: {
                        [Op.iLike]: `%${palavraBusca}%`,
                    },
                },
                {
                    rg: {
                        [Op.iLike]: `%${palavraBusca}%`,
                    },
                },
            ],
        },
    });
};

//Função para criar um novo cliente
const criaCliente = async (cliente) => {
    const newCliente = await model.Cliente.create(cliente);
    return newCliente;
};

//Função para atualizar cadastro do cliente
const atualizaCliente = async (cliente) => {
    try {
        await model.Cliente.update(cliente, {where: {id: cliente.id}});
        return await model.Cliente.findByPk(cliente.id);
    } catch (error) {
        throw error;
    }
}

//Função para deletar um cliente
const deletaCliente = async (cliente) => {
    try {
        await model.Cliente.destroy({ where: { id: cliente.id } });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    criaCliente,
    listaClientes,
    pesquisaCliente,
    atualizaCliente,
    deletaCliente
};
