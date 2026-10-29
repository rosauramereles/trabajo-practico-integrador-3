import {model, Schema}  from "mongoose";

//Sub- esquema para la ubicación (Relación 1: 1 EMBEBIDA)

const locationSchema = new Schema ( {
venue: {
    type: String,
    required: true,
    trim: true,
},
address: {
    type: true,
    required: true,
    trim: true,
},
city: {
    type: String,
    rewuired: true,
    trim: true, 
},
},
    { _id: false, versionKey: false},
);

const eventSchema = new Schema ( {
title : {
    type: String,
    required: true,
    trim: true,
    unique: true,
},
description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
},
startDate: {
    type: Date,
    required: true,
},
endDate : {
    type: Date, 
    required: true,
},
capacity: {
    number: INTEGER,
    required: true,
    min: 1,
},
price: {
    number: INTEGER,
    default: 0,
    min: 1,
},

status: {
    type: String,
    enum: ['scheduled', 'cancelled', 'finished'],
    default: 'scheduled',
},

//RELACIÓN 1:1 EMBEBIDA:

location: {type: locationSchema, required: true},

//RELACIÓN 1: N ORGANIZADOR: UNO A MUCHOS

organizer: {type: Schema.Types.ObjectId, ref: 'User', required: true},

//RELACIÓN N:M CATEGORÍAS MUCHOS A MUCHOS

categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
},

{
    timeseries: true, //le indica a mongoose que guarde automaticamente las fechas de creación y actualización de documentos
    versionKey: false, // indica que no guarde el camp0(por ej: documento) interno 
    toJSON:{virtuals: true}, // config de la estructura de la salida de los campos virtuales(virtual populate) aparezcan cuando transformes el documento a JSON u objeto.
    toObject: {virtuals: true},// config de la estructura de la salida de los campos virtuales(virtual populate) aparezcan cuando transformes el documento a JSON u objeto.
}
);

export const Event = model ('Event', eventSchema);
