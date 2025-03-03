import {Sequelize} from "sequelize-typescript";
import { User } from "./models/UserManagement/User";
import {Role} from "./models/UserManagement/Role";
import { Module } from "./models/UserManagement/Module";
import { UserRole } from "./models/UserManagement/UserRole";
import { Action } from "./models/UserManagement/Actions";
import { ModuleAction } from "./models/UserManagement/ModuleAction";
import { RoleWithModuleAction } from "./models/UserManagement/RoleWithModuleAction";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "fahad",
    password: "12345678",
    database: "expressdb",
    models: [
        User, 
        Role, 
        Module,
        UserRole,
        Action,
        ModuleAction,
        RoleWithModuleAction
    ],
    logging: false, 
})