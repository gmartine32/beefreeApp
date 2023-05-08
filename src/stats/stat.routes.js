import { Router } from "express";
import { createMultiStat, createStat, deleteStat, getStatByStoreFilter, getStatsByStoreCustomDate } from "./stats.controller.js";

const stat_router = Router();

stat_router.post('/',createStat)
stat_router.post('/createMulti',createMultiStat)
stat_router.post('/store/:id',getStatsByStoreCustomDate)
stat_router.post('/store/:id/:filter',getStatByStoreFilter)
stat_router.delete('/:id',deleteStat)







export default stat_router