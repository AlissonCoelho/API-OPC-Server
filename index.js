//Express
const express = require('express');
const app = express();
const consign = require('consign');
const port = 8000;

//ler formularios
app.use(express.json());
app.use(express.urlencoded())
consign()
    .include('rotas')
    .into(app);

//Executa express
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) }); 
