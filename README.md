# Chatbot Vonix

Este projeto é um MVP de um chatbot simples usando a API da OpenAI com Node.js. O bot interage com os usuários via texto e responde com base nas mensagens enviadas.

## Funcionalidades
- Interação via chat em tempo real.
- Respostas geradas usando a API da OpenAI.
- Interface simples com design nas cores azul e laranja.

## Pré-requisitos
Antes de começar, certifique-se de ter os seguintes itens instalados em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- NPM (geralmente instalado junto com o Node.js)
- Uma chave de API da OpenAI

## Instalação

### 1. Clone o repositório

git clone https://github.com/weehalves/ChatBotVonix.git

### 2. Entre no diretório do projeto

cd ChatBotVonix

### 3. Instale as dependências

npm install

### 4. Configure as variáveis de ambiente

Crie um arquivo .env no diretório raiz do projeto e adicione sua chave de API da OpenAI:

OPENAI_API_KEY=your_openai_api_key

Substitua your_openai_api_key pela sua chave real da OpenAI.

### 5. Inicie a aplicação
- Para rodar o servidor:
npm start
- Para rodar em modo de desenvolvimento (com recarga automática):
npm run dev

### 6. Acesse a aplicação
Abra o navegador e acesse:

http://localhost:3000

Você verá a interface do chatbot onde poderá interagir com ele.
