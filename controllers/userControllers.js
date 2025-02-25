import { PrismaClient } from '@prisma/client';
import { hashPassword,comparePassword } from '../utils/passwordUtils.js';

const prisma = new PrismaClient();

// Criar um usuario
export const createUser = async (req, res) => {
  try {
    const { nome, email, senha, telefone, latitude, longitude } = req.body;

    // Criptografar a senha
    const hashedPassword = await hashPassword(senha);

    const newUser = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        telefone,
        latitude,
        longitude,
      },
    });

    res.status(201).json("Usuário inserido com sucesso");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se é um usuário
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && await comparePassword(senha, user.senha)) {
      return res.json({ id: user.id, tipo: 'user' });
    }

    // Se não for usuário, verifica se é motorista
    const driver = await prisma.driver.findUnique({ where: { email } });

    if (driver && await comparePassword(senha, driver.senha)) {
      return res.json({ id: driver.id, tipo: 'driver' });
    }

    res.status(401).json({ message: 'Credenciais inválidas' });

  } catch (error) {
    res.status(500).json({ error: error.message });
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

export const getLocation = async (req, res) => {
  try {
    const userLocation = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: {
        latitude: true,
        longitude: true
      }
    });

    if (!userLocation) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json(userLocation);
  } catch (error) {
    res.status(500).json({eroo: "Erro ao consultar a localizacao do usuario",error: error.message });
  }
};

export const setLocation = async (req, res) => {
  try {
    const updatedUserLocation = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        latitude: req.body.latitude,
        longitude: req.body.longitude
      }
    });

    res.json(updatedUserLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


