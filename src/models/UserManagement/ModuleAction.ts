import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsToMany} from "sequelize-typescript";
import { Module } from "./Module";
import { Action } from "./Actions";
import { Role } from "./Role";
import { RoleWithModuleAction } from "./RoleWithModuleAction";

@Table({tableName: "moduleAction"})
export class ModuleAction extends Model{
    @Column({primaryKey : true, autoIncrement: true, type: DataType.INTEGER})
    id!: number;

    @ForeignKey(()=> Module)
    @Column({allowNull : false, type: DataType.INTEGER})
    moduleId!: number;

    @ForeignKey(()=> Action)
    @Column({allowNull : false, type: DataType.INTEGER})
    actionId!: number;

    @BelongsToMany(()=> Role, ()=> RoleWithModuleAction)
    role!: Role[]

}