// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Módulo para lidar com caminhos
const { getChatbotResponse } = require('./api');
const { getRasaResponse } = require('./rasa');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Configurar o middleware para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota para lidar com a conversa do chatbot
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Mensagem do usuário não fornecida." });
    }

    try {
        // Obter resposta e contexto do OpenAI
        const { contexto, resposta: openAiResponse } = await getChatbotResponse(userMessage);
        console.log('Contexto:', contexto); // Log do contexto para depuração
        console.log('Resposta OpenAI:', openAiResponse); // Log da resposta do OpenAI

        // Enviar o contexto e a mensagem do usuário para o Rasa
        const rasaResponse = await getRasaResponse(contexto, userMessage);
        console.log('Resposta Rasa:', rasaResponse); // Log da resposta do Rasa

        // Retornar a resposta ao usuário
        res.json({ openAiResponse, rasaResponse, contexto });
    } catch (error) {
        console.error('Erro no processamento da conversa:', error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

