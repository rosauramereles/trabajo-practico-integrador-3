import mongoose from "mongoose"; //librería para conectar con MongoDB


export const connectDB = async () => { //Función que conecta a la base(exportada) 
try {
    await mongoose.connect(process.env.MONGODB_URI); //conecta usando la URI del .env

    console.log("Conectado a la base de datos correctamente"); //conexión exitosa 
} catch (error) {
    console.log("No se pudo conectar a la base de datos", error); //muestra el error
}
};