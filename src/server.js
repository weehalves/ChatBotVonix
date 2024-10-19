const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { getChatbotResponse } = require('./api');
const { getRasaResponse } = require('./rasa');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Configurar o middleware para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Função para salvar mensagem e contexto no arquivo de treinamento
function salvarMensagemEContexto(mensagem, contexto) {
    const logEntry = `${mensagem};${contexto}\n`;
    const caminhoLog = path.join(__dirname, '../dados_treinamento.txt');

    fs.appendFile(caminhoLog, logEntry, (err) => {
        if (err) {
            console.error('Erro ao salvar a mensagem e o contexto:', err);
        } else {
            console.log('Mensagem e contexto salvos:', logEntry.trim());
        }
    });
}

// Rota para lidar com a conversa do chatbot
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Validação da mensagem do usuário
    if (!userMessage || typeof userMessage !== 'string') {
        return res.status(400).json({ resposta: 'Mensagem inválida.' });
    }

    try {
        // Tenta obter resposta do Rasa inicialmente
        const contextoRasa = await getRasaResponse('desconhecido', userMessage);
        console.log('Resposta do Rasa na primeira validação:', contextoRasa);

        // Se o Rasa retornar "desconhecido", consultamos a OpenAI
        if (contextoRasa.toLowerCase() === 'desconhecido') {
            console.log('Contexto desconhecido, consultando OpenAI...');

            // Consultar a OpenAI para identificar o contexto
            const contextoOpenAI = await getChatbotResponse(userMessage);
            console.log('Contexto identificado pela OpenAI:', contextoOpenAI.contexto);

            // Salvar apenas quando a OpenAI identificar um contexto
            salvarMensagemEContexto(userMessage, contextoOpenAI.contexto);

            // Se a OpenAI também retornar desconhecido, envia uma resposta padrão
            if (contextoOpenAI.contexto.toLowerCase() === 'desconhecido') {
                console.log('OpenAI também não entendeu, retornando mensagem padrão.');
                return res.json({ resposta: 'Desculpe, não entendi sua mensagem. Pode me esclarecer melhor?' });
            }

            // Consultar Rasa novamente com o contexto da OpenAI
            const rasaResponse = await getRasaResponse(contextoOpenAI.contexto, userMessage);
            console.log('Resposta do Rasa após consulta à OpenAI:', rasaResponse);

            // Se o Rasa também não entender, retornar a mensagem padrão
            if (rasaResponse.toLowerCase() === 'desconhecido') {
                return res.json({ resposta: 'Desculpe, não entendi sua mensagem. Pode me esclarecer melhor?' });
            }

            // Retornar a resposta ao usuário
            return res.json({ resposta: rasaResponse });
        } else {
            // Se o Rasa já retornou um contexto válido, retornamos essa resposta
            console.log('Contexto conhecido, retornando resposta do Rasa.');
            return res.json({ resposta: contextoRasa });
        }

    } catch (error) {
        console.error('Erro no processamento:', error);
        return res.status(500).json({ resposta: 'Erro ao processar a solicitação.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
