const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  appendMessage('You', userMessage, true);
  messageInput.value = '';

  setTimeout(() => {
    const botReply = getBotReply(userMessage);
    appendMessage('Bot', botReply, false);
  }, 500);
});

function appendMessage(sender, message, isOwn) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.classList.add(isOwn ? 'own' : 'other');
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function getBotReplyFactory() {
  let userName = '';

  return function(message) {
    const msg = message.toLowerCase().trim();

    // Greeting recognition
    if (/(hello|hi|hey|good morning|good evening)/.test(msg)) {
      return "Hi there! 👋 How can I assist you today?";
    }

    // Name extraction
    if (msg.startsWith("my name is") || msg.startsWith("i am")) {
      const parts = message.split(/my name is|i am/i);
      if (parts[1]) {
        userName = parts[1].trim().split(" ")[0];
        return `Nice to meet you, ${userName}! How can I help you today?`;
      }
    }

    if (msg.includes("what is my name") || msg.includes("do you know my name")) {
      return userName
        ? `Your name is ${userName}, of course! 😊`
        : "I don't think you've told me your name yet."
    }

    if (msg.includes("your name")) return "I am a friendly AI chatbot, created to assist you.";
    if (msg.includes("how are you")) return "I'm doing well, thanks for asking. How can I help you today?";
    if (msg.includes("who created you")) return "I was created by a developer as part of a full stack project.";
    if (msg.includes("thank")) return "You're very welcome! 🙏";
    if (msg.includes("what is") || msg.includes("who is") || msg.includes("define")) {
      return `That's an interesting question about "${message}". Let me think... 🤔 (Pretend I know more 😉)`;
    }

    // Fun / casual
    if (msg.includes("joke")) return "Why did the developer go broke? Because he used up all his cache! 😂";
    if (msg.includes("bye") || msg.includes("goodbye")) return "Goodbye! Have a great day ahead! 👋";
    if (msg.includes("age")) return "I'm ageless! I'm just a bunch of code running in your browser. 😄";
    if (msg.includes("help")) return "Sure! You can ask me about the time, date, your name, or just have a chat. I'm here!";

    // Time/date
    if (msg.includes("time")) return `The current time is ${new Date().toLocaleTimeString()}`;
    if (msg.includes("date")) return `Today's date is ${new Date().toLocaleDateString()}`;

    // Fallback
    const fallbacks = [
      "Can you please tell me more?",
      "Interesting... could you elaborate?",
      "That's a great question! Let me try to answer.",
      "I'm not sure I fully understand. Could you rephrase that?",
      "Let me look that up for you... Oh wait, I'm offline 😅",
      "Hmm, I haven't learned that yet. But I'm always growing!",
      "Tell me more so I can help you better."
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

const getBotReply = getBotReplyFactory();