const { chatWithGroq } = require("../services/groqService");

const handleChat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      const error = new Error("Message field is required and must be a string.");
      error.statusCode = 400;
      throw error;
    }

    const reply = await chatWithGroq(message);
    res.status(200).json({ reply });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleChat };