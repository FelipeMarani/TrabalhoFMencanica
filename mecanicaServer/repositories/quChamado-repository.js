const model = require("../models");
const { Op } = require("sequelize");

// Lista todos os registros da fila de chamados
const listaQuChamado = async () => {
	return await model.quChamado.findAll({
		include: [
			{ model: model.Funcionario, as: "Funcionario", required: false },
			{ model: model.stChamado, as: "StatusChamado", required: false },
			{
				model: model.Chamado,
				as: "Chamado",
				required: false,
				include: [{ model: model.Cliente, as: "Cliente", required: false }],
			},
		],
	});
};

// Pesquisa na fila por funcionário, status, cliente, número do chamado ou tipo de chamado
const pesquisaQuChamado = async (termoBusca) => {
	return await model.quChamado.findAll({
		include: [
			{ model: model.Funcionario, as: "Funcionario", required: false },
			{ model: model.stChamado, as: "StatusChamado", required: false },
			{
				model: model.Chamado,
				as: "Chamado",
				required: false,
				include: [
					{ model: model.Cliente, as: "Cliente", required: false },
					{ model: model.tpChamado, as: "TipoChamado", required: false },
				],
			},
		],
		where: {
			[Op.or]: [
				{ "$Funcionario.nome$": { [Op.iLike]: `%${termoBusca}%` } },
				{ "$StatusChamado.descricao$": { [Op.iLike]: `%${termoBusca}%` } },
				{ "$Chamado.Cliente.nome$": { [Op.iLike]: `%${termoBusca}%` } },
				{ "$Chamado.TipoChamado.descricao$": { [Op.iLike]: `%${termoBusca}%` } },
				{ "$Chamado.id$": termoBusca },
			],
		},
	});
};

// Cria uma nova associação na fila
const criaQuChamado = async (quChamado) => {
	const novo = await model.quChamado.create(quChamado);
	return novo;
};

// Atualiza um registro existente da fila
const atualizaQuChamado = async (quChamado) => {
	try {
		await model.quChamado.update(quChamado, { where: { id: quChamado.id } });
		return await model.quChamado.findByPk(quChamado.id);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	listaQuChamado,
	pesquisaQuChamado,
	criaQuChamado,
	atualizaQuChamado,
};
