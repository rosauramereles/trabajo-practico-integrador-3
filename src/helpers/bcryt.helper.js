import bcrypt from "bcrypt"; //Librería para hashear contrasaña

export const hashPassword = async (password) => { //Recibe la contraseña en texto plano
    return await bcrypt.hash (password, 10); //La hashea (10= nivel de seguridad)
};

export const comparePassword = async (password, hashPassword) => { //compara la contraseña con la del login
    return await bcrypt.compare(password, hashPassword); //Devuelve true si coincide, false si no 
};
