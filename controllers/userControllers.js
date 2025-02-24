import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar um usuario
export const createUser = async (req, res) => {
  try {
    const { nome, email, senha, telefone, latitude, longitude } = req.body;

    const newUser = await prisma.user.create({
      data: { nome, email, senha, telefone, latitude, longitude },
    });

    res.status(201).json("Usuario inserido");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar todos os usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar um ususrio pelo ID
export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um usuario
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar um usuario
export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
