const express = require("express");
const authService = require("../services/auth-service");

const authRouter = express.Router();

// POST /auth/login - Autenticação de funcionário
authRouter.post("/login", async (req, res) => {
	try {
		const { email, senha } = req.body;
		if (!email || !senha) {
			return res.status(400).json({ message: "email e senha são obrigatórios" });
		}

		const { token, funcionario } = await authService.login(email, senha);
		if (!token) {
			return res.status(401).json({ message: "Credenciais inválidas" });
		}

		res.status(200).json({ message: "Login efetuado", token, funcionario: { id: funcionario.id, email: funcionario.email, nome: funcionario.nome } });
	} catch (error) {
		console.error("Erro no login:", error?.message || error);
		res.status(500).json({ message: "Erro interno no login", detail: error?.message || String(error) });
	}
});

// POST /auth/novoFuncionario - Criar novo funcionário
authRouter.post("/novoFuncionario", async (req, res) => {
	try {
		const { email, senha, nome } = req.body;
		if (!email || !senha) {
			return res.status(400).json({ message: "email e senha são obrigatórios" });
		}

		const novo = await authService.criarNovoFuncionario({ email, senha, nome });
		res.status(201).json({ message: "Funcionário criado", funcionario: { id: novo.id, email: novo.email, nome: novo.nome } });
	} catch (error) {
		console.error("Erro ao criar funcionário:", error);
		res.status(400).json({ message: "Erro ao criar funcionário" });
	}
});

// GET /auth/me - Retorna dados do usuário autenticado
authRouter.get("/me", authService.requireJWTAuth, async (req, res) => {
	try {
		const funcionario = req.user;
		const permissoes = await authService.obterPermissoesFuncionario(funcionario.email);
		res.status(200).json({ funcionario: { id: funcionario.id, email: funcionario.email, nome: funcionario.nome }, permissoes });
	} catch (error) {
		console.error("Erro ao obter usuário:", error);
		res.sendStatus(500);
	}
});

module.exports = authRouter;
