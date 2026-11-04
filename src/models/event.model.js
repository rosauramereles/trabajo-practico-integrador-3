import {model, Schema, Types} from "mongoose";

const eventSchema = new Schema ( //Define la estructura del evento
{ 
title:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 150,
},
descripcion: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
},
startDate: {
    type: Date,
    required: true,
},
endDate: {
    type: String,
    required: true,
},
capacity: {
    type:String,
    required: true,
    min: 1,
    validate: {
        validator: Number.isInteger,
        message: "capacity debe ser un número entero",
    },
},
price: {
    type: Number,
    default: 0,
    min: 0,
},
status: {
    type: String,
    emun: ["scheduled", "cancelled", "finished"],
    default: "scheduled",
},
//Relación embebida: 1:1 uno a uno location esta dentro del documento Event 
location: {
    venue: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
address: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 150,
},
city: {
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
},
},
//Relación 1: N : uno a muchos referido = User a Event ( organizar)
//Event gurarda el _id del usuario, User lo busca con su virtual "events"
organizer: {
    type: Types.ObjectId,
    ref: "User",
    required: true, //Todo evento tiene organizador
},
//Relación N: M muchos a muchos referenciado a Event a Category (array de ObjectIds )
//Event guarda el _id del usuario, Category los busca con su virtual "events"
categories: [
    {
        type :Types.ObjectId, //cada elemento es un _id de mongo 
        ref: "Category", //Apunta al modelo category 
    },
],
},
{
    timestamps: true, //Agrega createdAt y updatedAt
    versionKey: false, //Quita el campo _ _ V
},
);

export const EventModel = model ("Event", eventSchema); //crea y exporta el modelo 