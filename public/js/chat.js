document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="user-message">Você: ${userInput}</div>`;

    document.getElementById('user-input').value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        if (response.ok) {
            chatBox.innerHTML += `<div class="bot-message">Bot: ${data.response}</div>`;
        } else {
            chatBox.innerHTML += `<div class="bot-message">Bot: ${data.error}</div>`;
        }
    } catch (error) {
        chatBox.innerHTML += `<div class="bot-message">Bot: Erro ao se comunicar com a API</div>`;
    }

    // Scroll para o final da caixa de chat
    chatBox.scrollTop = chatBox.scrollHeight;
}
