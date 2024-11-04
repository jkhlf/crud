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

app.get('/api/waifu', (req, res) => {
    const params = {
        included_tags: ['waifu'],
        height: '>=2000',
        is_nsfw: false,
        many: true,
        limit: 5
    };

    const apiUrl = 'https://api.waifu.im/search';
    const queryParams = new URLSearchParams(params).toString();
    
    axios.get(`${apiUrl}?${queryParams}`, {
        headers: {
            'Accept-Version': 'v6',
            'Authorization': `Bearer ${process.env.WAIFU_API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.error('Erro ao buscar dados da Waifu:', error);
        res.status(500).send('Erro ao buscar dados da Waifu');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
