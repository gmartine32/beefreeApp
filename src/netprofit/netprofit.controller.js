import { createNetProfit, deleteNetProfitById, editNetProfit, findNetProfits } from "./neoprofit.service.js"
import dayjs from "dayjs"

export const createNewNetProfit = async (req,res) =>{
    try {
        console.log("Creating",req.body)
        await createNetProfit(req.body)
       return res.status(201).send("Created")
    } catch (error) {
        console.log("Error creating",error)
        return res.status(500).send('error creating netprofit')
    }
}

export const getNetProfitCustomRange = async (req, res) => {
    try {
        const {startDate, endDate, id_store} = req.body
        const firstDate = `${dayjs(startDate).format('YYYY-MM-DD')} 00:00:00.000 -05:00`;
        const secondDate = `${dayjs(endDate).format('YYYY-MM-DD')} 23:59:59.999 -05:00`;
        const response  = await findNetProfits(firstDate,secondDate,id_store)
        console.log('netprofits',response);
        return res.status(200).send(response)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const getNetProfitFilter = async (req, res) => {
    try {
        const { id_store } = req.body
        const { filter } = req.params
        console.log('FILTER:', filter)
        const firstDate = filter == 'day' ?`${dayjs().subtract(5,'hour').format('YYYY-MM-DD')} 00:00:00.000 -05:00` : `${dayjs().subtract(5,'hour').startOf(filter).format('YYYY-MM-DD')} 00:00:00.000 -05:00`;
        const secondDate = filter == 'day' ?`${dayjs().subtract(5,'hour').format('YYYY-MM-DD')} 23:59:59.999 -05:00` : `${dayjs().subtract(5,'hour').endOf(filter).format('YYYY-MM-DD')} 23:59:59.999 -05:00`;
        const response  = await findNetProfits(firstDate,secondDate,id_store)
        console.log('netprofits',response);
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const editNetProfits = async (req, res) =>{
try {
    const {id} = req.params
    const {body} = req.body
    const success = await editNetProfit({...body,id})
    if(success){
        res.status(200).send({message:'edit successfully'})
    }else{
        res.status(200).send({message:'edit failed'})

    }
} catch (error) {
    console.log(error)
    res.status(500).send({message:'critical error editing netprofit'})
    
}
}

export const deleteNetProfit = async (req, res) => {
    try {
        const {id} = req.params
        const response = deleteNetProfitById(id)
        res.status(200).send({message:'deleted success'})
    } catch (error) {
        res.status(500).send({message:'error critical deleting success'})
    }
}
