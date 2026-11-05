import { matchedData } from "express-validator"; // Devuelve solo los datos validados
import { UserModel } from "../models/user.model.js"; // Modelo de usuarios
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js"; // Helpers de bcrypt
import { generateToken } from "../helpers/jwt.helper.js"; // Helper del JWT (mismo nombre que el export)

// POST /api/auth/register
export const register = async (req, res) => {
  try { // Si algo falla, lo atrapa el catch
    const { username, email, password, profile } = matchedData(req); // Solo datos validados

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] }); // Busca email o username repetido

    if (existingUser) { // Si ya existe
      return res.status(400).json({ message: "El email o usuario ya están registrados" }); // 400 = dato inválido
    }

    const hashedPassword = await hashPassword(password); // Hashea la contraseña con bcrypt

    await UserModel.create({
      username, // Nombre de usuario
      email, // Email
      password: hashedPassword, // Guarda el hash, no la contraseña real
      profile, // Perfil embebido
    });

    return res.status(201).json({ message: "Usuario registrado correctamente" }); // 201 = creado
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" }); // 500 = error inesperado
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req); // Solo datos validados

    const user = await UserModel.findOne({ email, deletedAt: null }); // Solo usuarios activos

    if (!user) { // Si no existe o está eliminado
      return res.status(401).json({ message: "Credenciales incorrectas" }); // 401 = no autenticado
    }

    const isMatch = await comparePassword(password, user.password); // Compara con el hash guardado

    if (!isMatch) { // Si la contraseña no coincide
      return res.status(401).json({ message: "Credenciales incorrectas" }); // 401
    }

    const token = generateToken(user); // El helper arma { id, role } 

    res.cookie("token", token, { // Guarda el token en una cookie
      httpOnly: true, // JavaScript del navegador no puede leerla
      sameSite: "strict", // No viaja desde otros sitios
    });

    return res.status(200).json({ message: "Inicio de sesión exitoso" }); // 200 = OK
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" }); // 500
  }
};

// GET /api/auth/profile
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id, deletedAt: null }).select("-password"); // Sin la contraseña

    if (!user) { // Si no existe el usuario 
      return res.status(404).json({ message: "Usuario no encontrado" }); // 404
    }

    return res.status(200).json(user); 
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" }); 
  }
};

// PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req); // Solo datos validados

    const updateFields = {}; // Campos a cambiar
    if (data.profile) { // Si vino información del usuario 
      for (const [key, value] of Object.entries(data.profile)) { // Recorre cada campo
        updateFields[`profile.${key}`] = value; // "profile.firstName": cambia solo ese campo
      }
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.user.id, deletedAt: null }, // Usuario logueado y activo
      { $set: updateFields }, // Aplica solo los cambios
      { new: true, runValidators: true }, // Devuelve el nuevo y valida con el esquema
    ).select("-password"); // Sin la contraseña

    if (!updatedUser) { // Si no existe
      return res.status(404).json({ message: "Usuario no encontrado" }); // 404
    }

    return res.status(200).json({
      message: "Perfil actualizado correctamente", // Mensaje de éxito
      data: updatedUser, // Usuario actualizado
    });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" }); // 500
  }
};

// POST /api/auth/logout
export const logout = (req, res) => {
  try {
    res.clearCookie("token"); // Borra la cookie del token
    return res.status(200).json({ message: "Sesión cerrada con éxito" }); // 200 = OK
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" }); // 500
  }
};