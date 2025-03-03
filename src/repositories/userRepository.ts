import { ILogin, IUser } from "../interface/userInterface";
import { Role } from "../models/UserManagement/Role";
import { User } from "../models/UserManagement/User";
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Module } from "../models/UserManagement/Module";
import { ModuleAction } from "../models/UserManagement/ModuleAction";
import { Action } from "../models/UserManagement/Actions";
import { RoleWithModuleAction } from "../models/UserManagement/RoleWithModuleAction";
import { Transaction } from "sequelize";

export interface IUserRepo {
    createUser(data : IUser): Promise<String>;
    getUser(username: string): Promise<User | null>;
    login(plainPassword: string, hashPassword: string): Promise<boolean>;
    generateAccessToken(userID : string) : string;
    generateRefreshToken(userID: string) : string;
    generateAccessTokenByRefreshToken(refreshToken: string) : string;
    createRoll(roleName : string, transaction : Transaction): Promise<Role>;
    createModule(moduleName: string): Promise<Module>;
    createModuleAction(moduleId: number, transaction: Transaction): Promise<void>;
    createRoleWithModuleAction(roleId: number, transaction: Transaction): Promise<void>;
}

export class UserRepository implements IUserRepo {
    createUser =async(data: IUser)=> {
        try{
            const userIntance = await User.findOne({
                where : {
                    username : data.username,
                    email: data.email
                }
            })
            if(userIntance){
                throw new Error ("username or email already taken");
            }
            
            const hashPassword = await bcrypt.hash(data.password, 10);
            const result = await User.create({
                username : data.username,
                password: hashPassword,
                email: data.email
            })
            return "success";
        }
        catch(err){
            throw new Error(String(err))
        }
        
    }

    getUser = async(username : string)=>{
        try{
            const userInstance  = await User.findOne({
                where: {
                    username : username
                }
            })
            return userInstance;
        }
        catch(err){
            throw new Error(String(err));
        }
        
    }

    generateAccessToken =(userID: string)=> {
        const expiry : string = process.env.ACCESS_TOKEN_EXPIRY || '15m';
        return jwt.sign({
            userID
        }, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: expiry as string
        });
    }

    generateRefreshToken =(userID: string)=> {
        return jwt.sign({userID}, process.env.REFRESH_TOKEN_SECRET as string, {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        })
    }

    generateAccessTokenByRefreshToken = (refreshToken : string)=> {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };
            
            return this.generateAccessToken(decoded.userId);
        } catch (err) {
            throw new Error(String(err));
        }
        
    }

    login = async(plainPassword: string, hashPassword: string)=> {
        return await bcrypt.compare(plainPassword, hashPassword) 
    }

    createRoll =async(roleName : string, transaction: Transaction)=> {
        try{
            const roleInstance = await Role.findOne({
                where: {
                    name : roleName
                }
            })
            if(roleInstance){
                throw new Error("Role already exists");
            }
            else{
                return await Role.create({
                    name: roleName,
                    
                }, {transaction})
            }
             
        }
        catch(err){
            throw new Error(String(err))
        }
    }

    createModule = async(moduleName : string)=> {
        try{
            const moudleInstance = await Module.findOne({
                where :  {
                    name : moduleName
                }
            })

            if(moudleInstance){
                throw new Error("Moudle already exists");
            }
            else{
                return await Module.create({
                    name: moduleName
                })
            }
        }
        catch(err){
            throw new Error(String(err))
        }
    }

    createModuleAction = async(moduleId: number, transaction: Transaction)=> {
        const actionList = await Action.findAll();
        for(let action of actionList){
            try{
                const moduleActionObject = await ModuleAction.create({
                    actionId: action.id,
                    moduleId: moduleId
                }, {transaction});

                const roleList = await Role.findAll();
                for(let role of roleList){
                    await RoleWithModuleAction.create({
                        roleId: role.id,
                        moduleActionId: moduleActionObject.id
                    }, {transaction});
                }
            }
            catch(err){
                throw new Error(String(err));
            }
        }

    }

    createRoleWithModuleAction =async (roleId: number, transaction: Transaction)=> {
        const moduleActoinList = await ModuleAction.findAll();
        for(let moduleAction of moduleActoinList){
            try{
                await RoleWithModuleAction.create({
                    moduleActionId: moduleAction.id,
                    roleId: roleId
                }, {transaction})
            }
            catch(err){
                throw new Error(String(err));
            }
        }
    }
}