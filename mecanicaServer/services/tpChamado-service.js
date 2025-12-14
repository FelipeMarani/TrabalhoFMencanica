const tpChamadoRepository = require("../repositories/tpChamado-repository");

const listaTpChamado = async (req, res) => {
    try {
        const tiposChamado = await tpChamadoRepository.listaTpChamado();
        res.status(200).json({ tiposChamado: tiposChamado });
    } catch (error) {
        console.log("Erro ao buscar tipos de chamado:", error);
        res.sendStatus(500);
    }
};

const pesquisaTpChamado = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Termo de busca é obrigatório" });
        }
        const resultado = await tpChamadoRepository.pesquisaTpChamado(termoBusca);
        res.status(200).json({ tiposChamado: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar tipo de chamado:", error);
        res.sendStatus(500);
    }
};

const criaTpChamado = async (req, res) => {
    const tpChamado = req.body;
    try {
        if (!tpChamado.id || !tpChamado.descricao) {
            return res.status(400).json({ message: "id e descricao são obrigatórios" });
        }
        const novoTpChamado = await tpChamadoRepository.criaTpChamado(tpChamado);
        res.status(201).json(novoTpChamado);
    } catch (error) {
        console.log("Erro ao criar tipo de chamado:", error);
        res.sendStatus(500);
    }
};

const atualizaTpChamado = async (req, res) => {
    try {
        const tpChamado = req.body;
        if (!tpChamado.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await tpChamadoRepository.atualizaTpChamado(tpChamado);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar tipo de chamado:", error);
        res.sendStatus(500);
    }
};

const deletaTpChamado = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await tpChamadoRepository.deletaTpChamado({ id });
        res.status(200).json({ message: "Tipo de chamado removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar tipo de chamado:", error);
        res.status(500).json({ message: "Erro ao deletar tipo de chamado" });
    }
};

module.exports = {
    listaTpChamado,
    pesquisaTpChamado,
    criaTpChamado,
    atualizaTpChamado,
    deletaTpChamado,
};
