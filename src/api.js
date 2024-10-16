const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY; // Certifique-se de que a chave API está correta
const apiUrl = 'https://api.openai.com/v1/chat/completions';

async function getChatResponse(message) {
    try {
        const response = await axios.post(apiUrl, {
            model: "gpt-3.5-turbo", // Modelo a ser utilizado
            messages: [{ role: "user", content: message }]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Erro ao se comunicar com a API:', error.response ? error.response.data : error.message);
        throw new Error('Erro ao se comunicar com a API');
    }
}

module.exports = { getChatResponse };

