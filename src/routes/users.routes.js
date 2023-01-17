import { Router } from "express";
import { authUser, createUser,deleteUser,getUser,getUsers, updateUser } from "../controllers/users.controller.js";

const users_router = Router();


users_router.get("/users",getUsers)
users_router.post("/users",createUser)
users_router.put("/users/:id",updateUser)
users_router.delete("/users/:id",deleteUser)
users_router.get("/users/:id",getUser)
users_router.post("/authUser",authUser)



export default users_router