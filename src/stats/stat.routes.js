import { Router } from "express";
import { createStat, deleteStat, getStatByStoreFilter, getStatsByStoreCustomDate } from "./stats.controller.js";
import { createMultipleStats } from "./stats.services.js";

const stat_router = Router();

stat_router.post('/',createStat)
stat_router.post('/createMulti',createMultipleStats)
stat_router.post('/store/:id',getStatsByStoreCustomDate)
stat_router.post('/store/:id/:filter',getStatByStoreFilter)
stat_router.delete('/:id',deleteStat)







export default stat_router