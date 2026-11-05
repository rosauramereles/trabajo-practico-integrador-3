import jwt from "jsonwebtoken"; // Librería para crear y verificar tokens

export const generateToken = (user) => { // Recibe el usuario completo
  return jwt.sign(
    {
      id: user._id.toString(), // Guarda el id del usuario (como texto)
      role: user.role, // Guarda el rol (user o admin)
    },
    process.env.JWT_SECRET, // Clave secreta para firmar
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Duración del token (1 día si no hay en el .env)
    },
  );
};

export const verifyToken = (token) => { // Recibe el token a revisar
  return jwt.verify(token, process.env.JWT_SECRET); // Devuelve el payload o lanza error
};