const quChamadoRepository = require("../repositories/quChamado-repository");

const listaQuChamado = async (req, res) => {
    try {
        const quChamados = await quChamadoRepository.listaQuChamado();
        res.status(200).json({ quChamados: quChamados });
    } catch (error) {
        console.error("Erro ao buscar fila de chamados:", error);
        res.status(500).json({ message: "Erro ao buscar fila de chamados", error: error.message });
    }
};

const pesquisaQuChamado = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Palavra para busca é obrigatório" });
        }
        const resultado = await quChamadoRepository.pesquisaQuChamado(termoBusca);
        res.status(200).json({ quChamados: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar fila de chamado:", error);
        res.sendStatus(500);
    }
};

const criaQuChamado = async (req, res) => {
    const quChamado = req.body;
    try {
        if (!quChamado.id || !quChamado.id_funcionario || !quChamado.id_Chamado || !quChamado.id_stChamado) {
            return res.status(400).json({ message: "id, id_funcionario, id_Chamado e id_stChamado são obrigatórios" });
        }
        const novoQuChamado = await quChamadoRepository.criaQuChamado(quChamado);
        res.status(201).json(novoQuChamado);
    } catch (error) {
        console.log("Erro ao criar fila de chamado:", error);
        res.sendStatus(500);
    }
};

const atualizaQuChamado = async (req, res) => {
    try {
        const quChamado = req.body;
        if (!quChamado.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await quChamadoRepository.atualizaQuChamado(quChamado);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar fila de chamado:", error);
        res.sendStatus(500);
    }
};

module.exports = {
    listaQuChamado,
    pesquisaQuChamado,
    criaQuChamado,
    atualizaQuChamado,
};
