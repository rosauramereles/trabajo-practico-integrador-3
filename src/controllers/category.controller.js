import { matchedData } from "express-validator"; // Devuelve solo los datos validados
import { CategoryModel } from "../models/category.model.js"; // Busca el modelo de categorías
import { EventModel } from "../models/event.model.js"; // Modelo de eventos (para la cascada)

// POST /api/categories
export const createCategory = async (req, res) => {
  try { // Si algo falla, lo atrapa el catch
    const data = matchedData(req, { locations: ["body"] }); // Solo datos validados del body

    const category = await CategoryModel.create(data); // Acá recien crea la categoria

    return res.status(201).json({ msg: "Categoría creada exitosamente", category }); // 201 = creado
  } catch (error) {
    console.log(error); // Muestra el error en la terminal
    return res.status(500).json({ msg: "Error interno en el servidor" }); // 500
  }
};

// GET /api/categories
export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find(); // Trae todas las categorías

    return res.status(200).json({ categories }); // 200 = OK
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Id de la URL

    const category = await CategoryModel.findById(id).populate("events"); // Busca una y trae sus eventos (virtual populate)

    if (!category) { // Si no existe
      return res.status(404).json({ msg: "Categoría no encontrada" }); // 404 [CONSIGNA: existencia]
    }

    return res.status(200).json({ category }); // 200 = OK
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // Id de la URL
    const data = matchedData(req, { locations: ["body"] }); // Solo datos validados del body

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id, // El id va directo
      data, // Campos a cambiar
      { new: true, runValidators: true }, // Devuelve el nuevo y valida con el esquema
    );

    if (!updatedCategory) { // Si no existe
      return res.status(404).json({ msg: "Categoría no encontrada" }); // 404 [CONSIGNA: existencia]
    }

    return res.status(200).json({ msg: "Categoría editada exitosamente", updatedCategory }); // 200 = OK
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // Id de la URL

    const category = await CategoryModel.findById(id); // Verifica que exista antes de borrar

    if (!category) { // Si no existe
      return res.status(404).json({ msg: "Categoría no encontrada" }); // 404 [CONSIGNA: existencia]
    }

    await EventModel.updateMany( // [CONSIGNA: cascada] Quita la categoría de todos los eventos
      { categories: id }, // Eventos que la tienen
      { $pull: { categories: id } }, // La saca del array categories
    );

    await CategoryModel.findByIdAndDelete(id); // Recién ahora borra la categoría

    return res.status(200).json({ msg: "Categoría eliminada exitosamente", category }); // 200 = OK
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};