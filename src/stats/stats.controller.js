import dayjs from "dayjs";
import moment from "moment";
import { Op, Sequelize } from "sequelize";

import { Store } from "../stores/store.js";
import { Stat } from "./stats.js";

export const createStat = async (req,res) =>{
    try {
        const {id_store, stat_type, createdAt} = req.body
        await Stat.create({
            stat_type: stat_type,
            id_store: id_store,
            createdAt: createdAt || new Date()
        })

        res.status(201).json({message:'stat created successfully'})

    } catch (error) {

        console.log(error)
        res.status(500).json({message:'error creating stat'})
        
    }


}

export const deleteStat = async (req, res) => {
    try {
      const { id } = req.params;
      const stat = await Stat.findByPk(id);
      if (!stat)
        return res.status(404).json({ message: "stat not found" });
      await Stat.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({ message: "stat deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "error deleting stat" });
    }
  };

  
export const getStatByStoreFilter = async (req, res) =>{
    try {
        const { id,filter } = req.params;
        const {stat_type} = req.body;
        const firstDate = moment().startOf(filter).toDate()
        const secondDate = moment().endOf(filter).toDate()
        const conditions={
            createdAt:{
                [Sequelize.Op.between]: [firstDate, secondDate],
            },
            stat_type:stat_type
        }
        if(id != 0) conditions.id_store = id

        console.log('@@@@',conditions)
        const order = await Stat.findAll({
            where:conditions,
            include: [
                {
                  model: Store,
                  attributes: ["name"],
                },
              ],
        })
  
        if(!order) return res.status(200).json({message:'stat not found'})
  
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'error getting stats'})
    }
  
  }

  export const getStatsByStoreCustomDate = async (req, res)=>{
    try {
      const { id } = req.params;
      const {startDate, endDate, stat_type} = req.body

      console.log('BODY',req.body)
      const firstDate = moment(startDate).startOf('days').toDate();
      const secondDate = moment(endDate).endOf('days').toDate();
      let conditions = {
          createdAt:{
              [Sequelize.Op.between]: [firstDate, secondDate],
          },
          stat_type:stat_type
      }
      if(id != 0) conditions.id_store = id
      const order = await Stat.findAll({
          where:conditions,
          include: [
              {
                model: Store,
                attributes: ["name"],
              },
            ],
      })
    
      if(!order) return res.status(200).json({message:'order not found'})
    
      return res.status(200).json(order)
    } catch (error) {
      
    }
    }