import {
    createListEstablishment,
    getAllListEstablishments,
    getListEstablishmentById,
    updateListEstablishment,
    deleteListEstablishment,
    getAllListEstablishmentsByUser,
  } from './listEstablishment.services.js';
  
  // Controlador para crear un nuevo establecimiento
  const createListEstablishmentController = async (req, res) => {
    const { name, userId } = req.body;
    try {
      const listEstablishment = await createListEstablishment(name, userId);
      res.status(201).json(listEstablishment);
    } catch (error) {
      // Manejar el error
      res.status(500).json({ error: 'Error al crear el establecimiento' });
    }
  };
  
  // Controlador para obtener todos los establecimientos
  const getAllListEstablishmentsController = async (req, res) => {
    try {
      const listEstablishments = await getAllListEstablishments();
      res.status(200).json(listEstablishments);
    } catch (error) {
      // Manejar el error
      res.status(500).json({ error: 'Error al obtener los establecimientos' });
    }
  };
  
  // Controlador para obtener un establecimiento por su ID
  const getListEstablishmentByIdController = async (req, res) => {
    const { id } = req.params;
    try {
      const listEstablishment = await getListEstablishmentById(id);
      res.status(200).json(listEstablishment);
    } catch (error) {
      // Manejar el error
      res.status(500).json({ error: 'Error al obtener el establecimiento por ID' });
    }
  };
  
  // Controlador para actualizar un establecimiento
  const updateListEstablishmentController = async (req, res) => {
    const { id } = req.params;
    const { name, userId } = req.body;
    try {
      await updateListEstablishment(id, name, userId);
      res.status(200).json({ success: true });
    } catch (error) {
      // Manejar el error
      res.status(500).json({ error: 'Error al actualizar el establecimiento' });
    }
  };
  
  // Controlador para eliminar un establecimiento
  const deleteListEstablishmentController = async (req, res) => {
    const { id } = req.params;
    try {
      await deleteListEstablishment(id);
      res.status(200).json({ success: true });
    } catch (error) {
      // Manejar el error
      res.status(500).json({ error: 'Error al eliminar el establecimiento' });
    }
  };
  
  // Controlador para obtener todos los establecimientos por usuario
  const getAllListEstablishmentsByUserController = async (req, res) => {
    const { userId } = req.params;
    try {
      const listEstablishments = await getAllListEstablishmentsByUser(userId);
      res.status(200).json(listEstablishments);
    } catch (error) {
      // Manejar el error
      res.status(500).json({ error: 'Error al obtener las listas por usuario' });
    }
  };
  
  export {
    createListEstablishmentController,
    getAllListEstablishmentsController,
    getListEstablishmentByIdController,
    updateListEstablishmentController,
    deleteListEstablishmentController,
    getAllListEstablishmentsByUserController,
  };