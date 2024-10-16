async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const userMessage = messageInput.value;

    const responseContainer = document.getElementById('responseContainer');

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        if (data.response) {
            responseContainer.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
        } else {
            responseContainer.innerHTML += `<p><strong>Error:</strong> ${data.error}</p>`;
        }
    } catch (error) {
        responseContainer.innerHTML += `<p><strong>Error:</strong> Não foi possível obter a resposta.</p>`;
    }
}
