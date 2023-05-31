import { Router } from "express";
import { createNewNetProfit, getNetProfitCustomRange, getNetProfitFilter } from "./netprofit.controller.js";
const netprofit_router = Router();


netprofit_router.post('/netprofit',createNewNetProfit)
netprofit_router.post('/netprofit/customDate',getNetProfitCustomRange)
netprofit_router.post('/netprofit/:filter',getNetProfitFilter)

export default netprofit_router