const chamadoRepository = require("../repositories/chamado-repository");

const listaChamados = async (req, res) => {
    try {
        const chamados = await chamadoRepository.listaChamados();
        res.status(200).json({ chamados: chamados });
    } catch (error) {
        console.log("Erro ao buscar chamados:", error);
        res.sendStatus(500);
    }
};

const pesquisaChamado = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Termo de busca é obrigatório" });
        }
        const resultado = await chamadoRepository.pesquisaChamado(termoBusca);
        res.status(200).json({ chamados: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar chamado:", error);
        res.sendStatus(500);
    }
};

const novoChamado = async (req, res) => {
    const chamado = req.body;
    try {
        if (!chamado.id || !chamado.id_Cliente || !chamado.id_Veiculo || !chamado.id_TPchamado) {
            return res.status(400).json({ message: "id, id_Cliente, id_Veiculo e id_TPchamado são obrigatórios" });
        }
        const novoChamadoCriado = await chamadoRepository.novoChamado(chamado);
        res.status(201).json(novoChamadoCriado);
    } catch (error) {
        console.log("Erro ao criar chamado:", error);
        res.sendStatus(500);
    }
};

const atualizaChamado = async (req, res) => {
    try {
        const chamado = req.body;
        if (!chamado.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await chamadoRepository.atualizaChamado(chamado);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar chamado:", error);
        res.sendStatus(500);
    }
};

module.exports = {
    listaChamados,
    pesquisaChamado,
    novoChamado,
    atualizaChamado,
};
