export const adminMiddleware = (req, res, next) => { // Recibe la petición, la respuesta y next
  if (req.user.role !== "admin") { // Si el usuario no es admin
    return res.status(403).json({ // 403 = autenticado pero sin permiso
      success: false, // Indica que falló la petición
      message: "No tiene permisos para realizar esta acción", // Mensaje de error
    });
}

  next(); // Si es admin, deja pasar al siguiente paso
};