const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const path = require('path');

// Configuração de ambiente
dotenv.config({ path: path.resolve(__dirname, './config.env') });

// Importar Rotas
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const classroomRoutes = require('./routes/classroomRoutes');

// Importar Middlewares
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' }));

// Conexão com MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });
    console.log('✅ Conectado ao MongoDB');
    
    // Inicia o servidor somente após conexão com o DB
    const server = http.createServer(app);
    server.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.error('❌ Falha na conexão com MongoDB:', err.message);
    process.exit(1); // Encerra o processo com falha
  }
};

// Conectar ao banco de dados
connectDB();

// Eventos de conexão do MongoDB
mongoose.connection.on('connected', () => {
  console.log('📊 Mongoose conectado ao DB');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ Erro na conexão do Mongoose:', err);
});

// Rotas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/schools', schoolRoutes);
app.use('/api/v1/classrooms', classroomRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Middleware para rotas não encontradas
app.use(notFound);

// Middleware global de tratamento de erros
app.use(errorHandler);

// Manipulador de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error('⚠️ Erro não tratado:', err);
  // Aqui você pode adicionar lógica para reiniciar o servidor se necessário
});

process.on('uncaughtException', (err) => {
  console.error('⚠️ Exceção não capturada:', err);
  process.exit(1);
});