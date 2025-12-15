const stChamadoRepository = require("../repositories/stChamado-repository");

const listaStChamado = async (req, res) => {
    try {
        const statusChamados = await stChamadoRepository.listaStChamado();
        res.status(200).json({ statusChamados: statusChamados });
    } catch (error) {
        console.log("Erro ao buscar status de chamado:", error);
        res.sendStatus(500);
    }
};

const pesquisaStChamado = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Termo de busca é obrigatório" });
        }
        const resultado = await stChamadoRepository.pesquisaStChamado(termoBusca);
        res.status(200).json({ statusChamados: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar status de chamado:", error);
        res.sendStatus(500);
    }
};

const criaStChamado = async (req, res) => {
    const stChamado = req.body;
    try {
        if (!stChamado.id || !stChamado.descricao) {
            return res.status(400).json({ message: "id e descricao são obrigatórios" });
        }
        const novoStChamado = await stChamadoRepository.criaStChamado(stChamado);
        res.status(201).json(novoStChamado);
    } catch (error) {
        console.log("Erro ao criar status de chamado:", error);
        res.sendStatus(500);
    }
};

const atualizaStChamado = async (req, res) => {
    try {
        const stChamado = req.body;
        if (!stChamado.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await stChamadoRepository.atualizaStChamado(stChamado);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar status de chamado:", error);
        res.sendStatus(500);
    }
};

const deletaStChamado = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await stChamadoRepository.deletaStChamado({ id });
        res.status(200).json({ message: "Status de chamado removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar status de chamado:", error);
        res.status(500).json({ message: "Erro ao deletar status de chamado" });
    }
};

module.exports = {
    listaStChamado,
    pesquisaStChamado,
    criaStChamado,
    atualizaStChamado,
    deletaStChamado,
};
