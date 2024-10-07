// src/api.js
const fetch = require('node-fetch');

async function getBotResponse(userMessage) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
            max_tokens: 60,
        }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error.message);
    }

    return data.choices[0].message.content;
}

module.exports = { getBotResponse };
