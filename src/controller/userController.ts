import express from "express";
import { IUserRepo } from "../repositories/userRepository";
import { BaseController } from "./BasaController";
import { ILogin } from "../interface/userInterface";
import {MESSAGE, DATA} from "../utils/constant";
import {Transaction} from "sequelize";
import {sequelize} from "../sequlize";

export class UserController extends BaseController{
    private _userRepository : IUserRepo;
    
    constructor(userRepository : IUserRepo){
        super();
        this._userRepository = userRepository;
    }

    createUser =async(req: express.Request, res: express.Response)=> {
        const data = req.body;
        try{
            const reusult = await this._userRepository.createUser(data);
            return this.create(res, {
                message : reusult,
                data: {}
            });
        }
        catch(err) {
            return this.error(res, {
               message : err instanceof Error ? err.message.replace(/^Error:\s*/, '') : "An unexpected error occurred",
               data : {}
            })
        }
    }

    login = async(req: express.Request, res: express.Response) => {
        try{
            const data : ILogin = req.body;
            const userResult = await this._userRepository.getUser(data.username);
            if(userResult){
                const loginReuslt = await this._userRepository.login(data.password ,userResult?.password);
                if(userResult && loginReuslt){
                    return this.ok(res, {
                        message: "success",
                        data: {
                            "accessToken": this._userRepository.generateAccessToken(userResult.id.toString()),
                            "refreshToken": this._userRepository.generateRefreshToken(userResult.id.toString())
                        }
                    })
                }
                else{
                    return this.unAuthorize(res, {
                        message: "Unauthorize",
                        data: {}
                    });
                }
            }
            else{
                return this.unAuthorize(res, {
                    message: "Unauthorize",
                    data: {}
                });
            }
                
        }
        catch(err) {
            return this.error(res, {
               message : err instanceof Error ? err.message.replace(/^Error:\s*/, '') : "An unexpected error occurred",
               data : {}
            })
        }
        
    }

    generateAccessTokenByRefreshToken = async(req: express.Request, res:express.Response)=> {
        try{
            const {refreshToken} = req.body;
            const result = this._userRepository.generateAccessTokenByRefreshToken(refreshToken);
            return this.ok(res,{
                message: "success",
                data: {
                    accessToken : result
                }
            });
        }
        catch(err){
            return this.error(res, {
                message : err instanceof Error ? err.message.replace(/^Error:\s*/, '') : "An unexpected error occurred",
                data : {}
             })
        }
    }

    createRole =async(req: express.Request, res: express.Response)=> {
        const transaction = await sequelize.transaction();
        try{
            const {roleName} = req.body;
            const roleResult = await this._userRepository.createRoll(roleName, transaction);
            if(roleResult) await this._userRepository.createRoleWithModuleAction(roleResult.id, transaction);
            (await transaction).commit();
            return this.create(res, {
                MESSAGE: "success",
                DATA: {}
            });
        }
        catch(err){
            (await transaction).rollback();
            return this.error(res, {
                MESSAGE : err instanceof Error ? err.message.replace(/^Error:\s*/, '') : "An unexpected error occurred",
                DATA : {}
             })
        }
    }

    createModule = async(req: express.Request, res: express.Response) => {
        const transaction = await sequelize.transaction();
        try{
            const {moduleName} = req.body;
            const moduleResult = await this._userRepository.createModule(moduleName);
            if(moduleResult){
                await this._userRepository.createModuleAction(moduleResult.id, transaction);
                await transaction.commit();
            }
            return this.create(res, {
                MESSAGE: "success",
                DATA: {}
            });
        }
        catch(err){
            return this.error(res, {
                MESSAGE : err instanceof Error ? err.message.replace(/^Error:\s*/, '') : "An unexpected error occurred",
                DATA : {}
             })
        }
    }
}
