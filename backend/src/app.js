const express = require("express");
const cors = require("cors");
const path = require("path");

const chatRoutes = require("./routes/chatRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../frontend")));

app.use("/api/chat", chatRoutes);

app.use(errorHandler);

module.exports = app;