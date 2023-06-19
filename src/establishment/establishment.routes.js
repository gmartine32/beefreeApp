import { Router } from "express";
import { createEstablishmentController, deleteEstablishmentController, editEstablishmentController, getAllEstablishmentsController, getEstablishmentByIdController } from "./establishment.controller.js";

const establishment_router = Router();

establishment_router.post('/establishments', createEstablishmentController);

// Ruta para obtener un establecimiento por ID
establishment_router.get('/establishments/:id', getEstablishmentByIdController);

// Ruta para obtener todos los establecimientos
establishment_router.get('/establishments', getAllEstablishmentsController);

// Ruta para editar un establecimiento
establishment_router.put('/establishments/:id', editEstablishmentController);

// Ruta para eliminar un establecimiento
establishment_router.delete('/establishments/:id', deleteEstablishmentController);

export default establishment_router;