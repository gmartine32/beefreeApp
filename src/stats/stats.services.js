import dayjs from "dayjs";
import moment from "moment";
import { Op, Sequelize } from "sequelize";
import { Store } from "../stores/store.js";
import { Stat } from "./stats.js";

export const createMultipleStats = async ({id_store, stat_type, createdAt, quantityStats}) =>{
console.log('aqui2222')
console.log({id_store, stat_type, createdAt, quantityStats})
    const responseStatList = []
    try {
        for (let i = 0; i < Number(quantityStats); i++) {
            console.log('entre')
           responseStatList.push( await createStats( { id_store, stat_type, createdAt } ) )
        }
        return {success:true, errors:responseStatList.filter(resStat=>!resStat).length}
    } catch (error) {
        console.log(error)
        return {success:false, errors:quantityStats}
        
    }
  }
   const createStats = async ({id_store, stat_type, createdAt}) =>{
    try {
        await Stat.create({
            stat_type: stat_type,
            id_store: id_store,
            createdAt: createdAt || new Date()
        })
        return true
    } catch (error) {
        console.log('ERROR::',error)
        return false
    }
   
   }