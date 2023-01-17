import { Router } from "express";
import { createStore,deleteStore,getStore,getStores, updateStore } from "../controllers/stores.controller.js";

const stores_router = Router();


stores_router.get("/stores",getStores)
stores_router.post("/stores",createStore)
stores_router.put("/stores/:id",updateStore)
stores_router.delete("/stores/:id",deleteStore)
stores_router.get("/stores/:id",getStore)

export default stores_router