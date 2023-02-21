import { Router } from "express";
import { createOrder, deleteOrder, getOrderByStore, getOrderByStoreCustomDate, getOrderByStoreFilter, getOrders } from "./order.controller.js";

const order_router = Router();

order_router.post('/order',createOrder)
order_router.get('/order/store/',getOrders)
order_router.get('/order/store/:id',getOrderByStore)
order_router.post('/order/store/:id',getOrderByStoreCustomDate)
order_router.get('/order/store/:id/:filter',getOrderByStoreFilter)
order_router.delete('/order/:id',deleteOrder)






export default order_router