const express = require('express');
const path = require('path');
const { Sumarizador } = require('./services/sumarizador');

const vendas = require(path.resolve(__dirname, './data/vendas1.json'));
const sumarizador = new Sumarizador(vendas);

const app = express();
const PORT = 3000;

app.use(express.json());

//Geral
app.get('/sumarizador', (req, res) => {
    const resumo = sumarizador.sumarizarGeral();
    res.send(`Quantidade total: ${resumo.quantidadeTotal}, Valor total: R$${resumo.valorTotal}, Preço médio: R$${resumo.precoMedio}`);
});

//Data
app.get('/por-data', (req, res) => {
    const resumo = sumarizador.sumarizarPor('data');
    res.json(resumo);
});

//Estado
app.get('/por-estado', (req, res) => {
    const resumo = sumarizador.sumarizarPor('uf');
    res.json(resumo);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
