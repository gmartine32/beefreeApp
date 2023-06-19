import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { Op, Sequelize } from "sequelize";
import { parseQuery } from "../libraries/tools/sql.tools.js";
import { User } from "../users/user.js";
import { Establishment } from "./establishment.js";


export const createEstablishment = async  (establishment) =>{
    try {
        await Establishment.create({
            ...establishment
        })
    } catch (error) {
    throw new Error(error);
        
    }
}
 
export const getEstablishmentById = async (id) => {
    try {
      const establishment = await Establishment.findByPk(id);
      if (!establishment) {
        throw new Error("No se encontró el establecimiento");
      }
      return parseQuery(establishment);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const getAllEstablishments = async () => {
    try {
      const establishments = await Establishment.findAll();
      return parseQuery(establishments);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const editEstablishment = async (id, updatedData) => {
    try {
      const establishment = await Establishment.findByPk(id);
      if (!establishment) {
        throw new Error("No se encontró el establecimiento");
      }
      await establishment.update(updatedData);
      return establishment;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const deleteEstablishment = async (id) => {
    try {
      const establishment = await Establishment.findByPk(id);
      if (!establishment) {
        throw new Error("No se encontró el establecimiento");
      }
      await establishment.destroy();
    } catch (error) {
      throw new Error(error);
    }
  };
  