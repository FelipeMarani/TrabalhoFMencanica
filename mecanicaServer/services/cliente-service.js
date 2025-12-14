const clienteRepository = require("../repositories/cliente-repository");

const listaClientes = async (req, res) => {
    try {
        const clientes = await clienteRepository.listaClientes();
        res.status(200).json({ clientes: clientes });
    } catch (error) {
        console.log("Erro ao buscar clientes:", error);
        res.sendStatus(500);
    }
};

const pesquisaCliente = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Termo para busca é obrigatório" });
        }
        const resultado = await clienteRepository.pesquisaCliente(termoBusca);
        res.status(200).json({ clientes: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar cliente:", error);
        res.sendStatus(500);
    }
};

const criaCliente = async (req, res) => {
    const cliente = req.body;
    try {
        if (!cliente.id || !cliente.nome || !cliente.email || !cliente.cpf) {
            return res.status(400).json({ message: "id, nome, email e cpf são obrigatórios" });
        }
        const novoCliente = await clienteRepository.criaCliente(cliente);
        res.status(201).json(novoCliente);
    } catch (error) {
        console.log("Erro ao criar cliente:", error);
        res.sendStatus(500);
    }
};

const atualizaCliente = async (req, res) => {
    try {
        const cliente = req.body;
        if (!cliente.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await clienteRepository.atualizaCliente(cliente);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar cliente:", error);
        res.sendStatus(500);
    }
};

const deletaCliente = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await clienteRepository.deletaCliente({ id });
        res.status(200).json({ message: "Cliente removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar cliente:", error);
        res.status(500).json({ message: "Erro ao deletar cliente" });
    }
};

module.exports = {
    listaClientes,
    pesquisaCliente,
    criaCliente,
    atualizaCliente,
    deletaCliente,
};
