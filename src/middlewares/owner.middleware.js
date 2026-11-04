import {} from "../models/event.model.js";

export const ownerOrAdminMiddleware = async (req,res,next) => { //Recibe la petición, la respuesta y el next 
try { //Si algo falla, lo atrapa el catch
const event = await EventModel.findById(req.params.id); //Busca el evento con el id que viene en la URL

if (!event) { //Si el evento no existe 
    return res.status(404).json ( { //404 = no encontrado 
    success: false, //Indica que falló la petición 
    message: "Evento no encontrado", //Mensaje de error 
});
}
if (req.user.role === "admin") { //Si el usuario es admin, deja pasar al siguiente paso
    req.event = event; //Guarda el evento para que el controlador no lo use otra vez 
    return next (); //Deja pasar el admin al siguiente paso
}

//Compara el id del organizador del evento con el id del usuario logueado
if (event.organizer.toString () !== req.user.id ) { //Si NO es el organizador (toString pasa el ObjectId a texto para poder compararlo con el id del usuario logueado)
    return res.status(403).json ( { //403 = este numero es para indicar que el usuario no tiene permiso
        success: false, //Indica que falló la petición
        message: "No tenés permisos para realizar esta acción", //Mensaje de error
    });
}
req.event = event  //Guarda el evento para que el controlador no lo use otra vez
next(); //Si es el organizador, lo deja pasar al siguiente paso
} catch (error) { //Si es que surge un error inesperado, lo atrapa el "catch"
return res.status (500) .json ( {
    success: false, //Indica que falló la petición 
    message: "Error interno del servidor", // Mensaje de error
});
}
}
