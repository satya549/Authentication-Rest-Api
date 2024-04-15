import express from "express";
import { deleteUser, getAllUser, updateUser } from "../controllers/users";
import { isAuthenticated } from "../middlewares";


export default (router: express.Router) =>{
    router.get('/users', isAuthenticated, getAllUser)
    router.delete('/users/:id', deleteUser);
    router.patch('/users/:id', updateUser);
}