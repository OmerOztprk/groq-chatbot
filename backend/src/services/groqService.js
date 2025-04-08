const axios = require("axios");
const { apiKey, apiUrl, model } = require("../config/groq");

if (!apiKey || !apiUrl || !model) {
  console.error("Missing required environment variables for Groq.");
  process.exit(1);
}

const chatWithGroq = async (userMessage) => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: model,
        messages: [
          { role: "system", content: "You are a helpful and friendly AI assistant." },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return (
      response.data.choices?.[0]?.message?.content || "No response received."
    );
  } catch (error) {
    console.error("Groq API Error:", error.message);
    throw new Error("Failed to connect to Groq API.");
  }
};

module.exports = { chatWithGroq };
