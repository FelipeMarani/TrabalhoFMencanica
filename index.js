const express = require("express");
const app = express();
const DOOR = 3030;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS simples para permitir chamadas do frontend (ex.: Vite em 5173)
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	if (req.method === "OPTIONS") return res.sendStatus(200);
	next();
});

// Rotas
const authRouter = require("./mecanicaServer/controllers/auth-controller");
app.use("/auth", authRouter);

// Registra todos os routers com base paths simplificados
const alFuncaoRouter = require("./mecanicaServer/controllers/alFuncao-controller");
const chamadoRouter = require("./mecanicaServer/controllers/chamado-controller");
const clienteRouter = require("./mecanicaServer/controllers/cliente-controller");
const enderecoRouter = require("./mecanicaServer/controllers/endereco-controller");
const funcaoRouter = require("./mecanicaServer/controllers/funcao-controller");
const funcionarioRouter = require("./mecanicaServer/controllers/funcionario-controller");
const funcionarioPermissaoRouter = require("./mecanicaServer/controllers/funcionarioPermissao-controller");
const permissaoRouter = require("./mecanicaServer/controllers/permissao-controller");
const quChamadosRouter = require("./mecanicaServer/controllers/quChamados-controller");
const stChamadosRouter = require("./mecanicaServer/controllers/stChamados-controller");
const tpChamadoRouter = require("./mecanicaServer/controllers/tpChamado-controller");
const tpVeiculoRouter = require("./mecanicaServer/controllers/tpVeiculo-controller");
const veiculoRouter = require("./mecanicaServer/controllers/veiculo-controller");

// Monta routers com base paths simplificados
app.use("/alinhamento_funcao", alFuncaoRouter);
app.use("/chamado", chamadoRouter);
app.use("/cliente", clienteRouter);
app.use("/endereco", enderecoRouter);
app.use("/funcao", funcaoRouter);
app.use("/funcionario", funcionarioRouter);
app.use("/funcionario_permissao", funcionarioPermissaoRouter);
app.use("/permissao", permissaoRouter);
app.use("/fila_chamados", quChamadosRouter);
app.use("/status_chamado", stChamadosRouter);
app.use("/tipo_chamado", tpChamadoRouter);
app.use("/tipo_veiculo", tpVeiculoRouter);
app.use("/veiculo", veiculoRouter);

// Alias para usuario_permissao (compatibilidade com frontend)
app.use("/usuario_permissao", funcionarioPermissaoRouter);

app.get("/", (_req, res) => res.json({ status: "ok" }));

app.listen(DOOR, () => console.log(`Servidor rodando na porta ${DOOR}`));
