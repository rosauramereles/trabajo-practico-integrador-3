import "dotenv/config"; // Carga las variables del .env
import express from "express"; // Framework del servidor
import cors from "cors"; // Permite peticiones de otros orígenes
import cookieParser from "cookie-parser"; // Lee las cookies

import { connectDB } from "./src/config/database.js"; // Conexión a MongoDB
//import { authRouter } from "./src/routes/authRoutes.js"; // Rutas de auth
//import { userRouter } from "./src/routes/userRoutes.js"; // Rutas de usuarios
//import { categoryRouter } from "./src/routes/categoryRoutes.js"; // Rutas de categorías
//import { eventRouter } from "./src/routes/eventRoutes.js"; // Rutas de eventos

const app = express(); // Crea el servidor

app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite leer JSON en req.body
app.use(cookieParser()); // Permite leer cookies en req.cookies


//Configuracion de las rutas 
//app.use("/api/auth", authRouter); // Prefijo para rutas de auth
//app.use("/api/users", userRouter); // Prefijo para rutas de usuarios
//app.use("/api/categories", categoryRouter); // Prefijo para rutas de categorías
//app.use("/api/events", eventRouter); // Prefijo para rutas de eventos

const PORT = process.env.PORT || 3000; // Puerto del .env o 3000

const startServer = async () => {
  await connectDB(); // Espera a conectar con la base

  app.listen(PORT, () => {
    console.log("Servidor listo"); // Avisa que arrancó
  });
};

startServer(); // Arranca todo