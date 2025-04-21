const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Configurar variáveis de ambiente
dotenv.config();

// Configurar o servidor Express
const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB", err));

// Rotas básicas
app.get("/", (req, res) => {
    res.send("API de Gestão Escolar");
});

// Rotas principais
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));