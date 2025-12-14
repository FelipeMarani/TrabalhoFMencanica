const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models");
const { secret, expiresIn } = require("../config/auth");

// Gera token JWT para email
const gerarToken = (email) => {
	return jwt.sign({ email }, secret, { expiresIn });
};

// Autenticação básica: email + senha
const login = async (email, senha) => {
	const funcionario = await model.Funcionario.findOne({ where: { email } });
	if (!funcionario) {
		return { token: null, funcionario: null };
	}

	const hash = funcionario.senha || "";
	let ok = false;
	try {
		// compara com bcrypt; se falhar, tenta comparação direta (modo legado)
		ok = await bcrypt.compare(senha, hash);
		if (!ok) ok = senha === hash;
	} catch (_) {
		ok = senha === hash;
	}

	if (!ok) {
		return { token: null, funcionario: null };
	}

	const token = gerarToken(funcionario.email);
	return { token, funcionario };
};

// Cria novo funcionário com senha hash
const criarNovoFuncionario = async ({ email, senha, nome }) => {
	const rounds = 10;
	const salt = bcrypt.genSaltSync(rounds);
	const hashed = bcrypt.hashSync(senha, salt);

	const novo = await model.Funcionario.create({ email, nome, senha: hashed });
	return novo;
};

// Middleware para exigir JWT
const requireJWTAuth = async (req, res, next) => {
	try {
		const auth = req.headers["authorization"] || "";
		const parts = auth.split(" ");
		if (parts.length !== 2 || parts[0] !== "Bearer") {
			return res.status(401).json({ message: "Token ausente ou inválido" });
		}
		const token = parts[1];
		const payload = jwt.verify(token, secret);
		const funcionario = await model.Funcionario.findOne({ where: { email: payload.email } });
		if (!funcionario) {
			return res.status(401).json({ message: "Usuário inválido" });
		}
		req.user = funcionario;
		next();
	} catch (error) {
		console.error("Erro no JWT:", error);
		return res.status(401).json({ message: "Token inválido" });
	}
};

// Verifica se funcionário tem permissão por descrição
const verificarPermissaoPorDescricao = async (email, descricao) => {
	try {
		const permissao = await model.Permissao.findOne({ where: { descricao } });
		if (!permissao) return false;
		const fp = await model.FuncionarioPermissao.findOne({ where: { email, id_permissao: permissao.id } });
		return fp !== null;
	} catch (error) {
		console.error("Erro ao verificar permissão:", error);
		return false;
	}
};

// Lista permissões do funcionário
const obterPermissoesFuncionario = async (email) => {
	try {
		const fps = await model.FuncionarioPermissao.findAll({
			where: { email },
			include: [{ model: model.Permissao, as: "Permissao" }],
		});
		return fps.map((fp) => fp.Permissao);
	} catch (error) {
		console.error("Erro ao obter permissões:", error);
		return [];
	}
};

// Middleware composto: exige JWT e uma permissão específica
const requirePermissao = (descricaoPermissao) => {
	return [
		requireJWTAuth,
		async (req, res, next) => {
			try {
				const email = req.user?.email;
				if (!email) return res.status(401).json({ message: "Usuário não autenticado" });
				const ok = await verificarPermissaoPorDescricao(email, descricaoPermissao);
				if (!ok) return res.status(403).json({ message: `Acesso negado. Permissão necessária: ${descricaoPermissao}` });
				next();
			} catch (error) {
				console.error("Erro ao verificar permissão:", error);
				return res.status(500).json({ message: "Erro interno do servidor" });
			}
		},
	];
};

module.exports = {
	login,
	criarNovoFuncionario,
	gerarToken,
	requireJWTAuth,
	verificarPermissaoPorDescricao,
	obterPermissoesFuncionario,
	requirePermissao,
};
