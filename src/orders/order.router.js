import { Router } from "express";
import { createOrder, deleteOrder, getDataOrderByCityFilter, getDataOrderByCityRangeDate, getDataStateByCityFilter, getOrderByStore, getOrderByStoreCustomDate, getOrderByStoreFilter, getOrders, getOrderStateByStore } from "./order.controller.js";

const order_router = Router();

order_router.post('/order',createOrder)
order_router.get('/order/store/',getOrders)
order_router.get('/order/store/:id',getOrderByStore)
order_router.post('/order/store/:id',getOrderByStoreCustomDate)
order_router.get('/order/store/:id/:filter',getOrderByStoreFilter)
order_router.delete('/order/:id',deleteOrder)
order_router.post('/order/store/cities/:id',getDataOrderByCityRangeDate)
order_router.get('/order/store/cities/:id/:filter',getDataOrderByCityFilter)
order_router.post('/order/store/states/:id',getOrderStateByStore)
order_router.get('/order/store/states/:id/:filter',getDataStateByCityFilter)









export default order_router