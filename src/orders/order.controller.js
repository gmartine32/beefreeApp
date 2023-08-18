
import { createOrders, deleteOrderById, gerOrderByStore, getAllOrders, getConsolidadoByCountryFilter, getConsolidadoFilter, getConsolidatedOrderByCountryCustomRange, getConsolidatedOrderCustomRange, getDataCitiesByStoreFilter, getDataOrderCityRangeDate, getOrderById, getOrderByStoreOnFilter, getOrderByStoreRangeDate, getOrderStateAtRangeDate, getStatesByStoreFilter } from "./order.services.js";

export const createOrder = async (req, res) => {
    try {
        //despues hare las validaciones lo juro xd
        
        await createOrders({...req.body})
        return res.status(201).json({message:'Order created successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Error creating order'})
    }
}

export const getOrders = async (req, res) =>{
        try {
            const order = await getAllOrders()
            if(!order) return res.status(200).json({message:'order not found'})
            return res.status(200).json(order)
        } catch (error) {
            return res.status(500).json({message:'error getting order'})
        }
  
}
export const getOrder = async (req, res) =>{
    const { id } = req.params;
        try {
            const order = await getOrderById(id)
            if(!order) return res.status(200).json({message:'order not found'})
            return res.status(200).json(order)
        } catch (error) {
            return res.status(500).json({message:'error getting order'})
        }
  
}

export const getOrderByStore = async (req, res) =>{
    const { id } = req.params;
        try {
            const order = await gerOrderByStore(id)
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
            const order = await getOrderByStoreRangeDate(id, startDate, endDate)
            return res.status(200).json(order)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'error getting order'})
        }
  
}
export const getOrderStateByStore = async (req, res) =>{
    try {
        const { id } = req.params;
        const {startDate, endDate} = req.body
        const order = await getOrderStateAtRangeDate(id, startDate, endDate)
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
        const order = await getOrderByStoreOnFilter(id,filter);
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'error getting order'})
    }

}

export const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteOrderById(id)
      return res.status(200).json({ message: "order deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "error deleting order" });
    }
  };

  export const getDataOrderByCityRangeDate = async (req, res) => {
    try {
        const { id } = req.params;
        const {startDate, endDate} = req.body
        const cities = await getDataOrderCityRangeDate(id, startDate, endDate)
        res.status(200).json(cities)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error getting cities'})
    }
  }

  export const getDataOrderByCityFilter = async (req, res) => {
    try {
        const { id,filter } = req.params;
        const cities = await getDataCitiesByStoreFilter(id, filter);
        res.status(200).json(cities)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error getting cities'})
    }
  }

  export const getDataStateByCityFilter = async (req, res) => {
    try {
        const { id,filter } = req.params;
        const states = await getStatesByStoreFilter(id, filter);
        res.status(200).json(states)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'error getting cities'})
    }
  }

  export const getOrderConsolidatedByStore = async (req, res)=>{
    try {
        const {id_store, startDate, endDate} = req.body
        const firstDate = startDate
        const secondDate = endDate
        const response = await  getConsolidatedOrderCustomRange({id_store,firstDate,secondDate})
        return res.status(200).json(response)
         
    } catch (error) {
        res.status(500).json({error: 'error getting uuuu'})
        
    }
  }

  export const getOrderConsolidatedByStoreFilter = async (req, res)=>{
    try {
        const {id_store, filter} = req.body
        const response = await  getConsolidadoFilter({id_store,filter})
        return res.status(200).json(response)
         
    } catch (error) {
        res.status(500).json({error: 'error getting uuuu'})
        
    }
  }


  export const getOrderConsolidatedCountryByStore = async (req, res)=>{
    try {
        const {id_store, startDate, endDate} = req.body
        const firstDate = startDate
        const secondDate = endDate
        const response = await  getConsolidatedOrderByCountryCustomRange({id_store,firstDate,secondDate})
        return res.status(200).json(response)
         
    } catch (error) {
        res.status(500).json({error: 'error getting uuuu'})
        
    }
  }

  export const getOrderConsolidatedCountryByStoreFilter = async (req, res)=>{
    try {
        const {id_store, filter} = req.body
        const response = await  getConsolidadoByCountryFilter({id_store,filter})
        return res.status(200).json(response)
         
    } catch (error) {
        res.status(500).json({error: 'error getting uuuu'})
        
    }
  }
  
  