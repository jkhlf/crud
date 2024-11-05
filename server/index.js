const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Rota para buscar dados do OMDB
app.get('/api/omdb/:movie', (req, res) => {
    const movie = req.params.movie;
    axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${process.env.OMDB_API_KEY}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da OMDB:', error);
            res.status(500).send('Erro ao buscar dados da OMDB');
        });
});

// Rota para buscar personagens e mapas do Valorant
app.get('/api/valorant/content', (req, res) => {
    axios.get(`https://br.api.riotgames.com/val/content/v1/contents?locale=pt-BR&api_key=${process.env.RIOT_API_KEY}`)
        .then(response => {
            res.json(response.data); // Envia os dados da API para o front-end
        })
        .catch(error => {
            console.error('Erro ao buscar dados do Valorant Content:', error);
            res.status(500).send('Erro ao buscar dados do Valorant Content');
        });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
