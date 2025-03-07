import express from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserController } from "../controller/userController";
import { Auth } from "../middleware/AuthMiddleware";
import { upload, pdfUpload } from "../service/MulterConfig";


const router = express.Router();
const userInstance = UserController.getUserControlerInstance()


router.post("/create", Auth.gaurd, (req, res)=>{
    userInstance.createUser(req, res);
});

router.post("/login", (req, res)=> {
    userInstance.login(req, res)
});

router.post("/refresh", (req, res)=> {
    userInstance.generateAccessTokenByRefreshToken(req, res); 
});

router.post("/role/create", Auth.gaurd, (req, res)=> {
    userInstance.createRole(req,res);
});

router.post("/module/create", Auth.gaurd, (req, res)=>{
    userInstance.createModule(req, res);
})


export default router;