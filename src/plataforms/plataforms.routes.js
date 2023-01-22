import { Router } from "express";
import { deleteMovement } from "../movements/movements.controller.js";
import { createPlataform,deletePlataform,getPlataform,getPlataforms, updatePlataform } from "./plataforms.controller.js";

const plataforms_router = Router();


plataforms_router.get("/plataforms",getPlataforms)
plataforms_router.post("/plataforms",createPlataform)
plataforms_router.put("/plataforms/:id",updatePlataform)
plataforms_router.delete("/plataforms/:id",deletePlataform)
plataforms_router.get("/plataforms/:id",getPlataform)

export default plataforms_router