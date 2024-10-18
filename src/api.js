// src/api.js
const axios = require('axios');

// Função para se comunicar com a API da OpenAI e classificar o contexto
async function getChatbotResponse(userMessage) {
    try {
        // Prompt modificado para pedir apenas o contexto
        const prompt = `Classifique a seguinte mensagem em um dos seguintes contextos: "suporte técnico", "vendas", "cobrança", "saudação", ou "despedida". Mensagem: "${userMessage}". Responda apenas com o contexto. Se não for algo relacionado a isso, retorne "desconhecido".`;
        
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Adiciona um log para exibir a resposta completa da OpenAI
        console.log('Resposta completa da OpenAI:', response.data);

        // Processa a resposta da API
        const openAiResponse = response.data.choices[0]?.message.content.trim().toLowerCase(); // Remove espaços desnecessários
        let contexto = 'desconhecido';

        // Verifica se a resposta é um dos contextos esperados
        if (openAiResponse === "suporte técnico") {
            contexto = "suporte_tecnico";
        } else if (openAiResponse === "vendas") {
            contexto = "vendas";
        } else if (openAiResponse === "cobrança") {
            contexto = "cobrancas";
        } else if (openAiResponse === "saudação") {
            contexto = "saudacao";
        } else if (openAiResponse === "despedida") {
            contexto = "despedida";
        }        

        return { contexto }; // Retorna apenas o contexto
    } catch (error) {
        console.error('Erro ao se comunicar com a API da OpenAI:', error);
        return { contexto: 'desconhecido' }; // Retorna 'desconhecido' em caso de erro
    }
}

module.exports = { getChatbotResponse };