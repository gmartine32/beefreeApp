import { createEstablishment, getEstablishmentById, getAllEstablishments, editEstablishment, deleteEstablishment } from './establishment.services.js';

// Controlador para crear un establecimiento
export const createEstablishmentController = async (req, res) => {
  try {
    const establishmentData = req.body; // Los datos del establecimiento se obtienen del cuerpo de la solicitud
    await createEstablishment(establishmentData);
    res.status(200).json({ message: 'Establecimiento creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un establecimiento por ID
export const getEstablishmentByIdController = async (req, res) => {
  try {
    const establishmentId = req.params.id; // El ID del establecimiento se obtiene de los parámetros de la ruta
    const establishment = await getEstablishmentById(establishmentId);
    res.status(200).json(establishment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los establecimientos
export const getAllEstablishmentsController = async (req, res) => {
  try {
    const establishments = await getAllEstablishments();
    res.status(200).json(establishments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para editar un establecimiento
export const editEstablishmentController = async (req, res) => {
  try {
    const establishmentId = req.params.id; // El ID del establecimiento se obtiene de los parámetros de la ruta
    const updatedData = req.body; // Los datos actualizados del establecimiento se obtienen del cuerpo de la solicitud
    const updatedEstablishment = await editEstablishment(establishmentId, updatedData);
    res.status(200).json(updatedEstablishment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un establecimiento
export const deleteEstablishmentController = async (req, res) => {
  try {
    const establishmentId = req.params.id; // El ID del establecimiento se obtiene de los parámetros de la ruta
    await deleteEstablishment(establishmentId);
    res.status(200).json({ message: 'Establecimiento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
