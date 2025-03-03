import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, BelongsToMany} from "sequelize-typescript";
import { Action } from "./Actions";
import { ModuleAction } from "./ModuleAction";

@Table({tableName : "module"})
export class Module extends Model{
    @Column({primaryKey : true, autoIncrement: true, type: DataType.INTEGER})
    id!: number;

    @Column({allowNull : false, type: DataType.STRING})
    name!: string;

    @BelongsToMany(()=> Action, ()=> ModuleAction)
    actions!: Action[]
}