import jwt from "jsonwebtoken"; //Librería para y verificar el tokens

export const generaToken = (user) => { //Recibe el usuario
    return jwt.sign (
{
    id: user._id.toString(), //Guarda el id del usuario (como texto)
    role: user.role, //Guarda el rol (user o admitrador)
},
process.env.JWT_SECRET, //Clave secreta 
{
    expiresIn: process.env.JWT_SECRET || "1d", //Cuánto dura el token antes de vencer (1dia si no hay en el .env)
},
);
};
export const verifyToken = (token) => { //Recibe el token a revisar 
    return jwt.verify(token, process.env.JWT_SECRET); //Devuelve el payload o lanza error 
};

//payload son los datos que guarda del token , es la carga que viaja dentro del JWT
//Es el objeto que armé en el generaToken



