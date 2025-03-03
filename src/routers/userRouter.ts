import express from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserController } from "../controller/userController";
import { Auth } from "../middleware/AuthMiddleware";


const router = express.Router();
const userRepo = new UserRepository();
const userInstance = new UserController(userRepo);


router.post("/create", (req, res)=>{
    userInstance.createUser(req, res);
});

router.post("/login", (req, res)=>{
    userInstance.login(req, res);
});

router.post("/refresh", (req, res)=> {
    userInstance.generateAccessTokenByRefreshToken(req, res); 
});

router.post("/role/create", (req, res)=> {
    userInstance.createRole(req,res);
});

router.post("/module/create", (req, res)=>{
    userInstance.createModule(req, res);
})

export default router;