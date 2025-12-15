/**
 * Gera um ID único para registros
 * Utiliza timestamp + número aleatório para garantir unicidade
 */
export const generateId = () => {
  return Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 10000);
};

/**
 * Gera um ID simples baseado em timestamp
 */
export const generateSimpleId = () => {
  return Math.floor(Date.now() / 1000);
};
