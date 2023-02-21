import { Router } from "express";
import { createStat, deleteStat, getStatByStoreFilter, getStatsByStoreCustomDate } from "./stats.controller.js";

const stat_router = Router();

stat_router.post('/stat',createStat)
stat_router.post('/stat/store/:id',getStatsByStoreCustomDate)
stat_router.post('/stat/store/:id/:filter',getStatByStoreFilter)
stat_router.delete('/stat/:id',deleteStat)







export default stat_router