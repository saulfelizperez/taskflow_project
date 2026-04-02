require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no está definido en las variables de entorno');
}

const PORT = Number(process.env.PORT);

module.exports = { PORT };