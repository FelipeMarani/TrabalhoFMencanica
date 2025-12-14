const funcionarioPermRepository = require("../repositories/funcionarioPermissao-repository");

const retornaTodosFuncionarioPermissoes = async (req, res) => {
    try {
        const fps = await funcionarioPermRepository.obterTodosFuncionarioPermissoes();
        res.status(200).json({ funcionario_permissoes: fps });
    } catch (error) {
        console.error("Erro ao buscar funcionario_permissoes:", error);
        res.sendStatus(500);
    }
};

const retornaPermissoesPorFuncionario = async (req, res) => {
    try {
        const email = req.params.email;
        const perms = await funcionarioPermRepository.obterPermissoesPorFuncionario(email);
        res.status(200).json({ permissoes: perms });
    } catch (error) {
        console.error("Erro ao buscar permissoes por funcionario:", error);
        res.sendStatus(500);
    }
};

const retornaFuncionariosPorPermissao = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const funcionarios = await funcionarioPermRepository.obterFuncionariosPorPermissao(id);
        res.status(200).json({ funcionarios: funcionarios });
    } catch (error) {
        console.error("Erro ao buscar funcionarios por permissao:", error);
        res.sendStatus(500);
    }
};

const criaFuncionarioPermissao = async (req, res) => {
    try {
        const { email, id_permissao } = req.body;
        if (!email || !id_permissao) {
            return res.status(400).json({ message: "email e id_permissao obrigatórios" });
        }
        const created = await funcionarioPermRepository.criarFuncionarioPermissao({ email, id_permissao });
        res.status(201).json(created);
    } catch (error) {
        console.error("Erro ao criar funcionario_permissao:", error);
        res.sendStatus(500);
    }
};

const deletaFuncionarioPermissao = async (req, res) => {
    try {
        const { email, id_permissao } = req.body;
        await funcionarioPermRepository.deletarFuncionarioPermissao({ email, id_permissao });
        res.status(200).json({ message: "Associação removida com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar funcionario_permissao:", error);
        res.sendStatus(500);
    }
};

module.exports = {
    retornaTodosFuncionarioPermissoes,
    retornaPermissoesPorFuncionario,
    retornaFuncionariosPorPermissao,
    criaFuncionarioPermissao,
    deletaFuncionarioPermissao,
};
