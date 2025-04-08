async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");

  const userMessage = document.createElement("div");
  userMessage.className = "chat-message user";
  userMessage.innerText = message;
  chatBox.appendChild(userMessage);

  const botMessage = document.createElement("div");
  botMessage.className = "chat-message bot";
  botMessage.innerText = "Typing...";
  chatBox.appendChild(botMessage);

  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    botMessage.innerText = data.reply || "No response received.";
  } catch (error) {
    botMessage.innerText = "An error occurred.";
    console.error(error);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("user-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});