// src/rasa.js
const axios = require('axios');

// Função para se comunicar com o Rasa e obter uma resposta de acordo com o contexto
async function getRasaResponse(contexto, userMessage) {
    try {
        // Enviar a mensagem do usuário para o Rasa no endpoint REST
        const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
            sender: "user",
            message: userMessage,
            metadata: { contexto }
        });

        // Extrair o texto da primeira resposta do Rasa, se disponível
        const rasaResponse = response.data[0]?.text || "Desculpe, não consegui entender.";
        
        console.log('Resposta do Rasa:', rasaResponse);
        return rasaResponse; // Retorna diretamente a resposta como string
    } catch (error) {
        console.error('Erro ao se comunicar com o Rasa:', error);
        return "Desculpe, houve um erro ao se comunicar com o sistema de atendimento.";
    }
}

module.exports = { getRasaResponse };
