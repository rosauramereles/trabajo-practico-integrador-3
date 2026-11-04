import { validationResult } from "express-validator";

export const validator = (req,res,next) => { // Recibe la petición, la respuesta y el next
    const result = validationResult(req); //Obtiene los errores de la petición

    if (!result.isEmpty()) { //Si hay al menos un error, entra la condición 
    return res.status(400).json ({errors: result.mapped()}); //con el 400 es para los datos son inválidos, y el mapped () es para que los errores se muestren en un objeto con el nombre del campo y el mensaje de error 
} 
next(); //Sin errores, deja pasar al siguiente paso 
};
