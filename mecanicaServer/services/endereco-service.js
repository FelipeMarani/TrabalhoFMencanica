const enderecoRepository = require("../repositories/endereco-repository");

const listaEnderecos = async (req, res) => {
    try {
        const enderecos = await enderecoRepository.listaEnderecos();
        res.status(200).json({ enderecos: enderecos });
    } catch (error) {
        console.log("Erro ao buscar endereços:", error);
        res.sendStatus(500);
    }
};

const pesquisaEndereco = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Termo para busca é obrigatório" });
        }
        const resultado = await enderecoRepository.pesquisaEndereco(termoBusca);
        res.status(200).json({ enderecos: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar endereço:", error);
        res.sendStatus(500);
    }
};

const criaEndereco = async (req, res) => {
    const endereco = req.body;
    try {
        if (!endereco.id || !endereco.id_funcionario) {
            return res.status(400).json({ message: "id e id_funcionario são obrigatórios" });
        }
        const novoEndereco = await enderecoRepository.criaEndereco(endereco);
        res.status(201).json(novoEndereco);
    } catch (error) {
        console.log("Erro ao criar endereço:", error);
        res.sendStatus(500);
    }
};

const atualizaEndereco = async (req, res) => {
    try {
        const endereco = req.body;
        if (!endereco.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await enderecoRepository.atualizaEndereco(endereco);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar endereço:", error);
        res.sendStatus(500);
    }
};

const deletaEndereco = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await enderecoRepository.deletaEndereco({ id });
        res.status(200).json({ message: "Endereço removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar endereço:", error);
        res.status(500).json({ message: "Erro ao deletar endereço" });
    }
};

module.exports = {
    listaEnderecos,
    pesquisaEndereco,
    criaEndereco,
    atualizaEndereco,
    deletaEndereco,
};
