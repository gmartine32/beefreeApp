import { Router } from "express";
import { createRol,deleteRol,getRol,getRols, updateRole } from "./rol.controller.js";

const rol_router = Router();


rol_router.get("/rols",getRols)
rol_router.post("/rols",createRol)
rol_router.put("/rols/:id",updateRole)
rol_router.delete("/rols/:id",deleteRol)
rol_router.get("/rols/:id",getRol)

export default rol_router