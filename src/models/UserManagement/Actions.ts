import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsToMany} from "sequelize-typescript";
import { Module } from "./Module";
import { ModuleAction } from "./ModuleAction";

@Table({tableName : "action"})
export class Action extends Model{
    @Column({primaryKey : true, autoIncrement: true, type: DataType.INTEGER})
    id!: number;

    @Column({allowNull : false, type: DataType.STRING})
    actionName!: string;

    @BelongsToMany(()=> Module, ()=> ModuleAction)
    module!: Module[]
}