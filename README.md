# ProjectVonix

Este é um projeto de chatbot integrado que utiliza a API da OpenAI para entender o contexto das mensagens do usuário e o Rasa para fornecer respostas automatizadas. O objetivo é criar um assistente virtual que possa lidar com diferentes cenários de atendimento ao cliente, como Suporte Técnico, Vendas e Cobranças.

## Pré-requisitos

Certifique-se de ter as seguintes dependências instaladas:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Rasa](https://rasa.com/) (instalação do Rasa necessária)

## Instalação

1. Clone este repositório e o repositorio do Rasa:

git clone https://github.com/weehalves/ChatBotVonix.git

2. Navegue até o diretório do projeto:

cd ChatBotVonix

3. Instale as dependências:

npm install

4. Configure suas variáveis de ambiente criando um arquivo .env na raiz do projeto e adicione sua chave da API da OpenAI:

OPENAI_API_KEY=sua_chave_da_api
PORT=3000  # ou qualquer outra porta que você preferir

5. Inicie o servidor:

node src/server.js

6. Abra seu navegador e acesse http://localhost:3000 para interagir com o chatbot.

## Funcionamento
O usuário envia uma mensagem através da interface do chatbot.

A mensagem é enviada para a API da OpenAI, que classifica o contexto e gera uma resposta inicial.

Em seguida, o contexto e a mensagem são enviados para o Rasa, que fornece uma resposta final com base no contexto identificado.

As respostas da OpenAI e do Rasa são exibidas na interface do chatbot.
