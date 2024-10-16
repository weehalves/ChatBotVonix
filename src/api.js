const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;

async function getOpenAIResponse(prompt) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "gpt-3.5-turbo", // Use o modelo correto
                prompt: prompt,
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].text;
    } catch (error) {
        console.error('Erro ao se comunicar com a API:', error.response ? error.response.data : error.message);
        throw new Error('Erro ao se comunicar com a API');
    }
}

module.exports = { getOpenAIResponse };
