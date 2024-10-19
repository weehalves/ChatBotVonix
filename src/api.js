const axios = require('axios');

// Função para se comunicar com a API da OpenAI e classificar o contexto
async function getChatbotResponse(userMessage) {
    try {
        // Prompt modificado para pedir apenas o contexto
        const prompt = `Classifique a seguinte mensagem em um dos seguintes contextos: "suporte tecnico", "vendas", "cobranca", "saudacao", ou "despedida". Mensagem: "${userMessage}". Responda apenas com o contexto, sem acentos. Se não for algo relacionado a isso, retorne "desconhecido".`;
        
        // Adiciona um log para ver o prompt antes de enviar
        console.log('Prompt enviado para OpenAI:', prompt);

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
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
        const openAiResponse = response.data.choices[0]?.message.content.trim().toLowerCase().replace(/[^\w\s]/gi, ''); // Normaliza a resposta
        console.log('Contexto retornado:', openAiResponse); // Log do contexto retornado

        let contexto = 'desconhecido';

        // Verifica se a resposta é um dos contextos esperados
        if (openAiResponse === "suporte tecnico") {
            contexto = "Preciso de ajuda técnica";
        } else if (openAiResponse === "vendas") {
            contexto = "Estou interessado em comprar um produto";
        } else if (openAiResponse === "cobranca") {
            contexto = "Quero esclarecer uma cobrança";
        } else if (openAiResponse === "saudacao") {
            contexto = "oi";
        } else if (openAiResponse === "despedida") {
            contexto = "tchau";
        }        

        return { contexto }; // Retorna apenas o contexto
    } catch (error) {
        console.error('Erro ao se comunicar com a API da OpenAI:', error);
        return { contexto: 'desconhecido' }; // Retorna 'desconhecido' em caso de erro
    }
}

module.exports = { getChatbotResponse };
