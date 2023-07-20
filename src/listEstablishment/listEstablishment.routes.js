import { Router } from "express";

import {
  createListEstablishmentController,
  getAllListEstablishmentsController,
  getListEstablishmentByIdController,
  updateListEstablishmentController,
  deleteListEstablishmentController,
  getAllListEstablishmentsByUserController,
} from './listEstablishment.controller.js';

const listEstablishmentRouter = Router();

// Ruta para crear un nuevo establecimiento
listEstablishmentRouter.post('/list-establishments', createListEstablishmentController);

// Ruta para obtener todos los establecimientos
listEstablishmentRouter.get('/list-establishments', getAllListEstablishmentsController);

// Ruta para obtener un establecimiento por su ID
listEstablishmentRouter.get('/list-establishments/:id', getListEstablishmentByIdController);

// Ruta para actualizar un establecimiento
listEstablishmentRouter.put('/list-establishments/:id', updateListEstablishmentController);

// Ruta para eliminar un establecimiento
listEstablishmentRouter.delete('/list-establishments/:id', deleteListEstablishmentController);

// Ruta para obtener todos los establecimientos por usuario
listEstablishmentRouter.get('/users/:userId/list-establishments', getAllListEstablishmentsByUserController);

export default listEstablishmentRouter;