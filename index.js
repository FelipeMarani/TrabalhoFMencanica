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

app.get("/", (_req, res) => res.json({ status: "ok" }));

app.listen(DOOR, () => console.log(`Servidor rodando na porta ${DOOR}`));
