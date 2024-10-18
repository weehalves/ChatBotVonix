// src/rasa.js
const axios = require('axios');

// Função para se comunicar com o Rasa e obter uma resposta de acordo com o contexto
async function getRasaResponse(contexto, userMessage) {
    try {
        // Enviar a mensagem do usuário para o Rasa no endpoint REST
        const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
            sender: "user",         // ID do usuário (pode ser um ID único)
            message: userMessage,   // Mensagem do usuário
            metadata: { contexto }   // Metadados, se necessário
        });

        // Extrair a resposta do Rasa
        const rasaResponse = response.data[0]?.text || "Desculpe, não consegui entender.";
        
        // Log para depuração
        console.log('Resposta do Rasa:', response.data);
        
        return rasaResponse;
    } catch (error) {
        console.error('Erro ao se comunicar com o Rasa:', error);
        return "Desculpe, houve um erro ao se comunicar com o sistema de atendimento.";
    }
}

module.exports = { getRasaResponse };

