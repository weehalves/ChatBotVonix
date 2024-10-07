app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Por favor, forneça uma mensagem.' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                prompt: userMessage,
                max_tokens: 100
            })
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Erro ao se comunicar com a API: ${response.status}, ${errorDetails.error.message}`);
        }

        const data = await response.json();
        res.json({ response: data.choices[0].text });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error.message);
        res.status(500).json({ error: `Erro interno do servidor: ${error.message}` });
    }
});