const veiculoRepository = require("../repositories/veiculo-repository");

const listaVeiculo = async (req, res) => {
    try {
        const veiculos = await veiculoRepository.listaVeiculo();
        res.status(200).json({ veiculos: veiculos });
    } catch (error) {
        console.log("Erro ao buscar veículos:", error);
        res.sendStatus(500);
    }
};

const pesquisaVeiculo = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Termo de busca é obrigatório" });
        }
        const resultado = await veiculoRepository.pesquisaVeiculo(termoBusca);
        res.status(200).json({ veiculos: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar veículo:", error);
        res.sendStatus(500);
    }
};

const criaVeiculo = async (req, res) => {
    const veiculo = req.body;
    try {
        if (!veiculo.id || !veiculo.id_cliente || !veiculo.id_tpVeiculo) {
            return res.status(400).json({ message: "id, id_cliente e id_tpVeiculo são obrigatórios" });
        }
        const novoVeiculo = await veiculoRepository.criaVeiculo(veiculo);
        res.status(201).json(novoVeiculo);
    } catch (error) {
        console.log("Erro ao criar veículo:", error);
        res.sendStatus(500);
    }
};

const atualizaVeiculo = async (req, res) => {
    try {
        const veiculo = req.body;
        if (!veiculo.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await veiculoRepository.atualizaVeiculo(veiculo);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar veículo:", error);
        res.sendStatus(500);
    }
};

const deletaVeiculo = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await veiculoRepository.deletaVeiculo({ id });
        res.status(200).json({ message: "Veículo removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar veículo:", error);
        res.status(500).json({ message: "Erro ao deletar veículo" });
    }
};

module.exports = {
    listaVeiculo,
    pesquisaVeiculo,
    criaVeiculo,
    atualizaVeiculo,
    deletaVeiculo,
};
