import moment from "moment";
import { Op, Sequelize } from "sequelize";

import { Store } from "../stores/store.js";
import { Order } from "./order.js";

export const createOrder = async (req, res) => {
    try {
        //despues hare las validaciones lo juro xd

        await Order.create({
            ...req.body
        })
        return res.status(201).json({message:'Order created successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Error creating order'})
    }
}

export const getOrders = async (req, res) =>{
        try {
            const order = await Order.findAll({
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
            return res.status(500).json({message:'error getting order'})
        }
  
}
export const getOrder = async (req, res) =>{
    const { id } = req.params;
        try {
            const order = await Order.findOne({
                where:{
                    id
                },
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
            return res.status(500).json({message:'error getting order'})
        }
  
}

export const getOrderByStore = async (req, res) =>{
    const { id } = req.params;
        try {
            const order = await Order.findAll({
                where:{
                    id_store: id
                },
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
            console.log(error)
            return res.status(500).json({message:'error getting order'})
        }
  
}

export const getOrderByStoreCustomDate = async (req, res) =>{
        try {
            const { id } = req.params;
            const {startDate, endDate} = req.body
            const firstDate = moment(startDate).toDate()
            const secondDate = moment(endDate).toDate()
            let conditions = {
                sale_date:{
                    [Sequelize.Op.between]: [firstDate, secondDate],
                }
            }

            if(id != 0) conditions.id_store = id
            const order = await Order.findAll({
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
            console.log(error)
            return res.status(500).json({message:'error getting order'})
        }
  
}

export const getOrderByStoreFilter = async (req, res) =>{
    try {
        const { id,filter } = req.params;
        const firstDate = moment().startOf(filter).toDate()
        const secondDate = moment().endOf(filter).toDate()
        const conditions={
            sale_date:{
                [Sequelize.Op.between]: [firstDate, secondDate],
            }
        }
        if(id != 0) conditions.id_store = id
        const order = await Order.findAll({
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
        console.log(error)
        return res.status(500).json({message:'error getting order'})
    }

}

export const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order)
        return res.status(404).json({ message: "order not found" });
      await Order.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({ message: "order deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "error deleting order" });
    }
  };

