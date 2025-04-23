const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Configuração de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Inicializa o app
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/students', require('./routes/studentRoutes'));
app.use('/api/v1/schools', require('./routes/schoolRoutes'));
app.use('/api/v1/classrooms', require('./routes/classroomRoutes'));

// Health Check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Middlewares de erros
app.use(notFound);
app.use(errorHandler);

// Inicializar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));