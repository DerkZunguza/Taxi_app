import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Função para criptografar senha
export const hashPassword = async (plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
};

// Função para comparar senha fornecida com o hash salvo
export const comparePassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
