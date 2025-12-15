const funcionarioRepository = require("../repositories/funcionario-repository");

const listaFuncionario = async (req, res) => {
    try {
        const funcionarios = await funcionarioRepository.listafuncionario();
        res.status(200).json({ funcionarios: funcionarios });
    } catch (error) {
        console.log("Erro ao buscar funcionários:", error);
        res.sendStatus(500);
    }
};

const pesquisaFuncionario = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Palavra para a busca é obrigatório" });
        }
        const resultado = await funcionarioRepository.pesquisaFuncionario(termoBusca);
        res.status(200).json({ funcionarios: resultado });
    } catch (error) {
        console.error("Erro ao pesquisar funcionário:", error);
        res.status(500).json({ message: "Erro ao pesquisar funcionário", error: error.message });
    }
};

const novoFuncionario = async (req, res) => {
    const funcionario = req.body;
    try {
        if (!funcionario.id || !funcionario.nome || !funcionario.email) {
            return res.status(400).json({ message: "id, nome e email são obrigatórios" });
        }
        const novoFuncionarioCriado = await funcionarioRepository.novoFuncionario(funcionario);
        res.status(201).json(novoFuncionarioCriado);
    } catch (error) {
        console.log("Erro ao criar funcionário:", error);
        res.sendStatus(500);
    }
};

const editaFuncionario = async (req, res) => {
    try {
        const funcionario = req.body;
        if (!funcionario.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await funcionarioRepository.editaFuncionario(funcionario);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar funcionário:", error);
        res.sendStatus(500);
    }
};

const deletafuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await funcionarioRepository.deletaFuncionario({ id });
        res.status(200).json({ message: "Funcionário removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar funcionário:", error);
        res.status(500).json({ message: "Erro ao deletar funcionário" });
    }
};

module.exports = {
    listaFuncionario,
    pesquisaFuncionario,
    novoFuncionario,
    editaFuncionario,
    deletafuncionario,
};
