import jwt from "jsonwebtoken";
import express, {Request, Response, NextFunction} from "express";
import {MESSAGE, DATA} from "../utils/constant";
import { User } from "../models/UserManagement/User";

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}

export class Auth {
    public static middleWare = async(req: Request, res: Response, next: NextFunction) => {
        const token = req.header("Authorization")?.split(" ")[1];
        
        if (!token) {
            res.status(401).json({
                MESSAGE: "Unauthorized",
                DATA: {}
            });
            return; // Ensure nothing else happens after this
        }
        
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
            req.user = decoded;
            console.log(req.user.userID);

            const userInstance  = await User.findOne({
                where : {
                    id: req.user.userID
                }
            })
            console.log(userInstance?.isSuperUser)
            next();
        } catch (err) {
            res.status(403).json({
                MESSAGE: "Invalid or expired token",
                DATA: {}
            });
            return; // Ensure nothing else happens after this
        }
    }
}
