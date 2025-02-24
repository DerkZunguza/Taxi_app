import 'dotenv/config';
import express from "express";
import { prisma, testConnection } from './database/db.js';
import  userRoutes from './routes/userRoutes.js';


const app = express();
app.use(express.json());
testConnection();

app.use(userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
