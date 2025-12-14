const funcaoRepository = require("../repositories/funcao-repository");

const listaFuncao = async (req, res) => {
    try {
        const funcoes = await funcaoRepository.listaFuncao();
        res.status(200).json({ funcoes: funcoes });
    } catch (error) {
        console.log("Erro ao buscar funções:", error);
        res.sendStatus(500);
    }
};

const pesquisaFuncao = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "termo para busca é obrigatório" });
        }
        const resultado = await funcaoRepository.pesquisaFuncao(termoBusca);
        res.status(200).json({ funcoes: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar função:", error);
        res.sendStatus(500);
    }
};

const novaFuncao = async (req, res) => {
    const funcao = req.body;
    try {
        if (!funcao.id || !funcao.nome || !funcao.descricao) {
            return res.status(400).json({ message: "id, nome e descricao são obrigatórios" });
        }
        const novaFuncaoCriada = await funcaoRepository.novaFuncao(funcao);
        res.status(201).json(novaFuncaoCriada);
    } catch (error) {
        console.log("Erro ao criar função:", error);
        res.sendStatus(500);
    }
};

const editaFuncao = async (req, res) => {
    try {
        const funcao = req.body;
        if (!funcao.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizada = await funcaoRepository.editaFuncao(funcao);
        res.status(200).json(atualizada);
    } catch (error) {
        console.log("Erro ao atualizar função:", error);
        res.sendStatus(500);
    }
};

const deletaFuncao = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await funcaoRepository.deletaFuncao({ id });
        res.status(200).json({ message: "Função removida com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar função:", error);
        res.status(500).json({ message: "Erro ao deletar função" });
    }
};

module.exports = {
    listaFuncao,
    pesquisaFuncao,
    novaFuncao,
    editaFuncao,
    deletaFuncao,
};
