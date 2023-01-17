import { Router } from "express";
import {  getCostsChartDataWeek, getCostsStoreChartDataWeek, getIncomeChartDataWeek, getIncomeStoreChartDataWeek, getIndicatorsAll, getIndicatorsStore } from "../controllers/dashboard.controller.js";
const dashboard_router = Router();

dashboard_router.get("/dashboard/indicators",getIndicatorsAll)
dashboard_router.get("/dashboard/indicators/:id_store",getIndicatorsStore)
dashboard_router.get("/dashboard/charts/incomes/",getIncomeChartDataWeek)
dashboard_router.get("/dashboard/charts/incomes/:id_store",getIncomeStoreChartDataWeek)
dashboard_router.get("/dashboard/charts/costs/",getCostsChartDataWeek)
dashboard_router.get("/dashboard/charts/costs/:id_store",getCostsStoreChartDataWeek)




export default dashboard_router
