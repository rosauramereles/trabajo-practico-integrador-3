import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startDB } from "./src/config/database.js";
//import authRoutes from './src/routes/auth.routes.js';
//import userRoutes from './src/routes/user.routes.js';
//import eventRoutes from './src/routes/event.routes.js';
//import categoryRoutes from './src/routes/category.routes.js';


//CONFIGURACION DE LA APLICACION CON EXPRESS Y CON EL PUERTO 
const app = express();
const PORT = process.env.PORT || 3003;

//MIDDLEWARES Y PARA QUE LEE EL JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//CONEXIÓN A LAS RUTAS

//app.use('/api/auth', authRoutes);
//app.use('/api/users', userRoutes);
//app.use('/api/events', eventRoutes);
//app.use('/api/categories', categoryRoutes);



app.listen(PORT, async () => {
  await startDB();
  console.log("Servidor listo");
});

