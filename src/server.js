const express = require('express');
const bodyParser = require('body-parser');
const { getChatResponse } = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const botResponse = await getChatResponse(userMessage);
        res.json({ response: botResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

