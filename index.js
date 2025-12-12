const express = require("express");
const app = express();
const DOOR = 3030;

app.use(express.json()); 
app.listen(DOOR, () => console.log(`Servidor rodando na porta ${DOOR}`)); //callback
app.use(express.urlencoded({extended: true}));
