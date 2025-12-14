const alFuncaoRepository = require("../repositories/alFuncao-repository");

const listaAlFuncao = async (req, res) => {
    try {
        const alFuncoes = await alFuncaoRepository.listaAlFuncao();
        res.status(200).json({ alFuncoes: alFuncoes });
    } catch (error) {
        console.log("Erro ao buscar alinhamentos de função:", error);
        res.sendStatus(500);
    }
};

const pesquisaAlFuncao = async (req, res) => {
    try {
        const { nomeBuscado } = req.query;
        if (!nomeBuscado) {
            return res.status(400).json({ message: "Nome para a busca é obrigatório" });
        }
        const resultado = await alFuncaoRepository.pesquisaAlFuncao(nomeBuscado);
        res.status(200).json({ alFuncoes: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar alinhamento de função:", error);
        res.sendStatus(500);
    }
};

const criaAlFuncao = async (req, res) => {
    const { id, id_funcao, id_funcionario } = req.body;
    try {
        if (!id || !id_funcao || !id_funcionario) {
            return res.status(400).json({ message: "id, id_funcao e id_funcionario são obrigatórios" });
        }
        const novoAlFuncao = await alFuncaoRepository.criaAlFuncao({ id, id_funcao, id_funcionario });
        res.status(201).json(novoAlFuncao);
    } catch (error) {
        console.log("Erro ao criar alinhamento de função:", error);
        res.sendStatus(500);
    }
};

const atualizaAlFuncao = async (req, res) => {
    try {
        const alFuncao = req.body;
        if (!alFuncao.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await alFuncaoRepository.atualizaAlFuncao(alFuncao);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar alinhamento de função:", error);
        res.sendStatus(500);
    }
};

const deletaAlFuncao = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await alFuncaoRepository.deletaAlFuncao({ id });
        res.status(200).json({ message: "Alinhamento de função removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar alinhamento de função:", error);
        res.status(500).json({ message: "Erro ao deletar alinhamento de função" });
    }
};

module.exports = {
    listaAlFuncao,
    pesquisaAlFuncao,
    criaAlFuncao,
    atualizaAlFuncao,
    deletaAlFuncao,
};
