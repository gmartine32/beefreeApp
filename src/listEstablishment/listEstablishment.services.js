import { ListEstablishment } from "./listEstablishment.js";
import { parseQuery } from "../libraries/tools/sql.tools.js";


// Crear un nuevo establecimiento
const createListEstablishment = async (name, userId) => {
    try {
      const listEstablishment = await ListEstablishment.create({ name, id_user: userId });
      return listEstablishment;
    } catch (error) {
      // Manejar el error
      console.error('Error al crear el establecimiento:', error);
      throw error;
    }
  };
  
  // Obtener todos los establecimientos
  const getAllListEstablishments = async () => {
    try {
      const listEstablishments = await ListEstablishment.findAll();
      return listEstablishments;
    } catch (error) {
      // Manejar el error
      console.error('Error al obtener los establecimientos:', error);
      throw error;
    }
  };
  
  // Obtener un establecimiento por su ID
  const getListEstablishmentById = async (id) => {
    try {
      const listEstablishment = await ListEstablishment.findByPk(id);
      return parseQuery(listEstablishment);
    } catch (error) {
      // Manejar el error
      console.error('Error al obtener el establecimiento por ID:', error);
      throw error;
    }
  };
  
  // Actualizar un establecimiento
  const updateListEstablishment = async (id, name, userId) => {
    try {
      const [rowsUpdated] = await ListEstablishment.update({ name, id_user: userId }, { where: { id } });
      if (rowsUpdated === 0) {
        throw new Error('No se encontró el establecimiento para actualizar');
      }
      return { success: true };
    } catch (error) {
      // Manejar el error
      console.error('Error al actualizar el establecimiento:', error);
      throw error;
    }
  };
  
  // Eliminar un establecimiento
  const deleteListEstablishment = async (id) => {
    try {
      const rowsDeleted = await ListEstablishment.destroy({ where: { id } });
      if (rowsDeleted === 0) {
        throw new Error('No se encontró el establecimiento para eliminar');
      }
      return { success: true };
    } catch (error) {
      // Manejar el error
      console.error('Error al eliminar el establecimiento:', error);
      throw error;
    }
  };

  const getAllListEstablishmentsByUser = async (userId) => {
    try {
      const listEstablishments = await ListEstablishment.findAll({
        where: { id_user: userId },
      });
      return parseQuery(listEstablishments);
    } catch (error) {
      // Manejar el error
      console.error('Error al obtener las listas por usuario:', error);
      throw error;
    }
  };
  
  export {
    createListEstablishment,
    getAllListEstablishments,
    getListEstablishmentById,
    updateListEstablishment,
    deleteListEstablishment,
    getAllListEstablishmentsByUser,
  };