import { Router } from "express";
import { createNewNetProfit, deleteNetProfit, editNetProfits, getNetProfitCustomRange, getNetProfitFilter } from "./netprofit.controller.js";
const netprofit_router = Router();


netprofit_router.post('/netprofit',createNewNetProfit)
netprofit_router.put('/netprofit/:id',editNetProfits)
netprofit_router.delete('/netprofit/:id',deleteNetProfit)
netprofit_router.post('/netprofit/customDate',getNetProfitCustomRange)
netprofit_router.post('/netprofit/:filter',getNetProfitFilter)

export default netprofit_router
