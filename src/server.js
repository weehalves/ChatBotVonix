// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
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

// Função para salvar mensagem e contexto no arquivo de treinamento
function salvarMensagemEContexto(mensagem, contexto) {
    const logEntry = `${mensagem};${contexto}\n`;
    const caminhoLog = path.join(__dirname, '../dados_treinamento.txt');

    fs.appendFile(caminhoLog, logEntry, (err) => {
        if (err) {
            console.error('Erro ao salvar a mensagem e o contexto:', err);
        } else {
            console.log('Mensagem e contexto salvos:', logEntry.trim());
        }
    });
}

// Rota para lidar com a conversa do chatbot
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Obter resposta e contexto do OpenAI
        const { contexto } = await getChatbotResponse(userMessage);
        console.log('Contexto:', contexto);

        // Salvar a mensagem do usuário e o contexto detectado
        salvarMensagemEContexto(userMessage, contexto);

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