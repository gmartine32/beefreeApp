import { createNetProfit, findNetProfits } from "./neoprofit.service.js"
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

