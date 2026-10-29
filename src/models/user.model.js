import { model, Schema } from "mongoose";

// sub- esquema para el perfil del usuario (Relación 1:1 Embebida) lo que le agrego en profile

const profileSchema = new Schema ( {

firstName : {
    type: String,
    required: true,
    trim: true,
},
lasName : {
    type : String,
    required: true,
    trim : true,
},
birhDate : {
    type: Date,
},
phone : {
    type: String,
    trim: true,
},    
},
    { _id: false, versionKey: true}
);

//Atributos 

const userSchema = new Schema (
    {
username :{
    type: String,
    unique: true,  //para asegurar que no exixsta otro usuario
    required: true, //el campo no puede estar vacio
    trim: true,//limpiador de espacio 
},

email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, //Formato válido
},
password :{
    type: String,

},
role :{
    type: String,
    enum : ['user', 'admin'],
    default: 'user',
},

//Relación  1:1 EMBEBIDA 
profile: {type: profileSchema, required: true},


//ELIMINACIÓN LÓGICA 
deletedAt: {type: Date, default: null},
},
{
    timestamps: true,
    versionKey: false,
    toJSON: {virtuales: true},
    toObject: {virtuals: true},
}
);
//Virtual polulate sirve para los eventos realizados por el usuarios
//este evento lo haría en el usuario de la persona registrada

userSchema.virtual ( 'events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'organizer',
});

export const User = model ('User', userSchema);