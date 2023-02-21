import { Router } from "express";
import { createMovement,getMovements,getMovement,deleteMovement,updateMovement, getMovementByStore, getMovementByStoreFilter, getMovementsByStoreCustomDate } from "./movements.controller.js";

const movements_router = Router();


movements_router.get("/movements",getMovements)
movements_router.post("/movements",createMovement)
movements_router.post("/movements/:id/",getMovementsByStoreCustomDate)
movements_router.post("/movements/:id/:filter",getMovementByStoreFilter)
movements_router.put("/movements/:id",updateMovement)
movements_router.delete("/movements/:id",deleteMovement)
movements_router.get("/movements/:id",getMovement)
movements_router.get("/movements/store/:id_store",getMovementByStore)


export default movements_router