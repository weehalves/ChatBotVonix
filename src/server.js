// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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

    try {
        // Obter resposta e contexto do OpenAI
        const { contexto } = await getChatbotResponse(userMessage);
        console.log('Contexto:', contexto);

        // Enviar o contexto e a mensagem do usuário para o Rasa
        const rasaResponse = await getRasaResponse(contexto, userMessage);
        console.log('Resposta do Rasa:', rasaResponse);

        // Certificar que a resposta final está correta antes de enviar ao frontend
        const respostaFinal = rasaResponse || "Desculpe, não consegui entender.";

        console.log('Resposta enviada ao frontend:', respostaFinal);

        // Retornar a resposta ao usuário com a chave correta
        res.json({ resposta: respostaFinal });
    } catch (error) {
        console.error('Erro no processamento:', error);
        res.status(500).json({ resposta: 'Erro ao processar a solicitação.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


