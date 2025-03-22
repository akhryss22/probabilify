let typingTimer; // Timer identifier
const typingDelay = 500; // Delay in milliseconds
let isProcessing = false; // Flag to prevent multiple submissions

async function fetchResponse(userMessage) {
    console.log("Sending message:", userMessage); // Log the user message
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer YOUR_API_KEY",  // Your new API key
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "qwen/qwen2.5-vl-72b-instruct:free",  // Model name
            "messages": [
                {
                    "role": "user",
                    "content": userMessage
                }
            ]
        })
    });

    try {
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error(`Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log("API response:", data); // Log the API response
        return data.choices[0].message.content; // Extract the chatbot's response
    } catch (error) {
        console.error('Error parsing response:', error);
        return 'Sorry, I encountered an error processing your request.';
    }
}

// Function to handle sending messages
async function sendMessage() {
    if (isProcessing) return; // Prevent multiple submissions
    isProcessing = true; // Set processing flag

    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) {
        isProcessing = false; // Reset processing flag
        return;
    }

    // Disable the send button to prevent multiple clicks
    const sendButton = document.getElementById("sendButton");
    sendButton.disabled = true;

    // Display user message
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="message user"><p>${userInput}</p></div>`;

    // Show loading spinner
    const loadingMessage = `<div class="message bot loading"><p>Loading...</p><div class="spinner"></div></div>`;
    chatBox.innerHTML += loadingMessage;

    // Get AI response
    try {
        const botResponse = await fetchResponse(userInput);

        // Remove loading indicator and show response
        const loadingElement = chatBox.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
        chatBox.innerHTML += `<div class="message bot"><p>${botResponse}</p></div>`;

        // Clear input field and scroll to bottom
        document.getElementById("user-input").value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        const loadingElement = chatBox.querySelector('.loading');
        if (loadingElement) {
            loadingElement.innerHTML = '<p>Error: Could not get response</p>';
        }
    } finally {
        // Re-enable the send button
        sendButton.disabled = false;
        isProcessing = false; // Reset processing flag
    }
}

// Debounce function
function debounce(func, delay) {
    return function(...args) {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Add event listener for Enter key with debounce
document.getElementById("user-input").addEventListener("keypress", debounce(function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}, typingDelay)); 