// src/server.js
const express = require('express');
const path = require('path');
require('dotenv').config(); // Carrega variáveis de ambiente de um arquivo .env
const api = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir os arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint para lidar com a API de chatbot
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const botResponse = await api.getBotResponse(userMessage);
        res.json({ response: botResponse });
    } catch (error) {
        console.log('API Key:', process.env.OPENAI_API_KEY);
        res.status(500).json({ error: 'Erro ao se comunicar com a API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server Running http://localhost:${PORT}`);
});