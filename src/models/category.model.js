import { model, Schema } from "mongoose";

const categorySchema = new Schema (
    {
name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxleght: 50,

},
descripcion: {
    type: String,
    trim: true,
    maxleght: 500,
},
deleted: {
    type: Boolean,
    default: false,
},
},
{
    timestamps: true,
    versionKey: false,
}
);


export const Category = model ('Category', categorySchema);