const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Importar Rotas
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const classroomRoutes = require('./routes/classroomRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/schools', schoolRoutes); // Registrar rotas de Escolas
app.use('/api/classrooms', classroomRoutes); // Registrar rotas de Turmas

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));