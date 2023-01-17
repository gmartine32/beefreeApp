import { Router } from "express";
import { createMovement,getMovements,getMovement,deleteMovement,updateMovement } from "../controllers/movements.controller.js";

const movements_router = Router();


movements_router.get("/movements",getMovements)
movements_router.post("/movements",createMovement)
movements_router.put("/movements/:id",updateMovement)
movements_router.delete("/movements/:id",deleteMovement)
movements_router.get("/movements/:id",getMovement)

export default movements_router