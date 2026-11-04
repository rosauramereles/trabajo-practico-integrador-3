import {model, Schema} from "mongoose";

const userSchema = new Schema ( { //Define la estructura del usuario
username: {
    type: String,
    required: true, //obligatorio
    unique: true, //unico 
    trim: true, //saca espacios sobrantes 
    minlength: 3,
    maxlength: 20,
},
email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, //es para guardar letras en minúsculas 
    match: /^\S+@\S+\.\S+$/, //formato válido 
    },
password: {
    type: String,
    required: true,
},
role: {
    type: String,
    enum: ["user", "admin"], //valores "enum:" "user," y "admin"
    default: "user", //por defecto es user se usa para esto // "default: "user"
},
//Relación 1:1 Embebida 
profile: {
    firtName:{
        type: String,
        trim: true,
        minlenght: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        trim: true,
        minlenght: 2,
        maxlength: 50,
    },
    birthDate: {
        type: Date,
    },
    phone: {
        type: String,
        trim: true,
    },
},
//Para la eliminación lógica
deletedAt: {
    type: Date, 
    default: null, //null= usuario activo 
},
},
{
    timestamps: true, //Agrega createdAt y updatedAt (timestamps : true )
    versionKey: false, //Quita el campo _ _ v (versionkey : false)
    toJSON: {virtuals: true}, //muestra los virtuales en JSON  (configuracion)
    toObject: {virtuals: true}, //muestra los virtuales en objetos (configuracion)
}
);

//virtual populate 

userSchema.virtual ("events", {
    ref: "Event", //Modelo con el que se conecta 
    localField: "_id", //Campo de User que se compara
    foreignField: "organizer", //campo de Event que guarda el _is del usuario  
});

export const UserModel = model ("User", userSchema); // Cres y exporta el modelo







