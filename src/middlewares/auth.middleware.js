import { verifyToken} from "../helpers/jwt.helper.js"; //Para verificar el token

export const authMiddleware = (req,res, next) => {
    try { //Si algo falla, lo atrapa el catch
        const token = req.cookies?.token; //Lee el token de las cookies (el ? esto evita que halla error si es no hay cookies)
    
    if (!token) { //Si no hay token
        return res.status(401).json ({message: "Usuario no autenticado"});
    }
    const payload = verifyToken (token); //Verifica el token y obtiene (el id y el role del usuario logueado) y payload es un objeto que contiene el id y el role del usuario logueado

    req.user = payload; //Guarda el payload que seria los datos del usuario logueado
    next(); //Si no hay errores, deja pasar al siguiente paso 
    }catch (error) { //Si es que hay error lo atrapa por ejemplo un token falso o vencido
    console.error (error); //Muestra el error en la consola
    return res.status (401).json ({message: "Token inválido o expirado"}); //401 no autenticado 
    }
};

