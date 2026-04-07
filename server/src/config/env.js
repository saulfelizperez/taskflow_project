const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

if (!process.env.PORT) {
  throw new Error("El puerto no está definido en las variables de entorno");
}

const PORT = Number(process.env.PORT);

console.log("Puerto cargado desde .env:", PORT); // solo para probar

module.exports = { PORT };
