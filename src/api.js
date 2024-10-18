// src/api.js
const axios = require('axios');

// Função para se comunicar com a API da OpenAI e classificar o contexto
async function getChatbotResponse(userMessage) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Processa a resposta da API para obter o contexto e a resposta inicial
        const openAiResponse = response.data.choices[0].message.content;
        let contexto = 'desconhecido';

        // Identifica o contexto a partir da resposta do OpenAI
        if (openAiResponse.toLowerCase().includes("suporte")) {
            contexto = "suporte_tecnico";
        } else if (openAiResponse.toLowerCase().includes("vendas")) {
            contexto = "vendas";
        } else if (openAiResponse.toLowerCase().includes("cobrança")) {
            contexto = "cobrancas";
        }

        // Log para depuração
        console.log('Resposta da OpenAI:', response.data);
        
        return { contexto, resposta: openAiResponse };
    } catch (error) {
        console.error('Erro ao se comunicar com a API da OpenAI:', error);
        return { error: "Erro ao se comunicar com a API" };
    }
}

module.exports = { getChatbotResponse };

