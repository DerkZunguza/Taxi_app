import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log(' Conectado ao banco de dados com sucesso!');
  } catch (error) {
    console.error(' Erro ao conectar ao banco de dados:', error);
  }
}

export { prisma, testConnection };
