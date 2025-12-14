const tpVeiculoRepository = require("../repositories/tpVeiculo-repository");

const listaTpVeiculo = async (req, res) => {
    try {
        const tiposVeiculo = await tpVeiculoRepository.listaTpVeiculo();
        res.status(200).json({ tiposVeiculo: tiposVeiculo });
    } catch (error) {
        console.log("Erro ao buscar tipos de veículo:", error);
        res.sendStatus(500);
    }
};

const pesquisaTpVeiculo = async (req, res) => {
    try {
        const { termoBusca } = req.query;
        if (!termoBusca) {
            return res.status(400).json({ message: "Termo de busca  é obrigatório" });
        }
        const resultado = await tpVeiculoRepository.pesquisaTpVeiculo(termoBusca);
        res.status(200).json({ tiposVeiculo: resultado });
    } catch (error) {
        console.log("Erro ao pesquisar tipo de veículo:", error);
        res.sendStatus(500);
    }
};

const criaTpVeiculo = async (req, res) => {
    const tpVeiculo = req.body;
    try {
        if (!tpVeiculo.id || !tpVeiculo.nome) {
            return res.status(400).json({ message: "id e nome são obrigatórios" });
        }
        const novoTpVeiculo = await tpVeiculoRepository.criaTpVeiculo(tpVeiculo);
        res.status(201).json(novoTpVeiculo);
    } catch (error) {
        console.log("Erro ao criar tipo de veículo:", error);
        res.sendStatus(500);
    }
};

const atualizaTpVeiculo = async (req, res) => {
    try {
        const tpVeiculo = req.body;
        if (!tpVeiculo.id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        const atualizado = await tpVeiculoRepository.atualizaTpVeiculo(tpVeiculo);
        res.status(200).json(atualizado);
    } catch (error) {
        console.log("Erro ao atualizar tipo de veículo:", error);
        res.sendStatus(500);
    }
};

const deletaTpVeiculo = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id é obrigatório" });
        }
        await tpVeiculoRepository.deletaTpVeiculo({ id });
        res.status(200).json({ message: "Tipo de veículo removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar tipo de veículo:", error);
        res.status(500).json({ message: "Erro ao deletar tipo de veículo" });
    }
};

module.exports = {
    listaTpVeiculo,
    pesquisaTpVeiculo,
    criaTpVeiculo,
    atualizaTpVeiculo,
    deletaTpVeiculo,
};
