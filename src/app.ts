import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors({
  origin: '*', // Permite requisições de qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rotas
app.use('/api/task', taskRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Corelab API está funcionando!' });
});

export default app;

