import { Router } from "express";
import { createMovement,getMovements,getMovement,deleteMovement,updateMovement, getMovementByStore, getMovementByStoreFilter, getMovementsByStoreCustomDate, getIncomesValues, getIncomesValuesFilter, getIncomebyYears, getIncomesCountTodayByHour, getCostToChart, getCostToChartFilter } from "./movements.controller.js";

const movements_router = Router();


movements_router.get("/movements",getMovements)
movements_router.post("/movements",createMovement)
movements_router.post("/movements/:id/",getMovementsByStoreCustomDate)
movements_router.post("/movements/:id/:filter",getMovementByStoreFilter)
movements_router.put("/movements/:id",updateMovement)
movements_router.delete("/movements/:id",deleteMovement)
movements_router.get("/movements/:id",getMovement)
movements_router.get("/movements/store/:id_store",getMovementByStore)
movements_router.post("/movements/incomes/value/stat",getIncomesValues)
movements_router.get("/movements/incomes/value/:filter",getIncomesValuesFilter)
movements_router.post("/movements/incomes/years/date",getIncomebyYears)
movements_router.post("/movements/cost/chart/chartcost",getCostToChart)
movements_router.post("/movements/cost/chart/chartcostFilter",getCostToChartFilter )
movements_router.get("/movements/incomes/today/:id_store",getIncomesCountTodayByHour)






export default movements_router