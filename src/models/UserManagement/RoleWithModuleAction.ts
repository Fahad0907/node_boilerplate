import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey} from "sequelize-typescript";
import { Role } from "./Role";
import { ModuleAction } from "./ModuleAction";

@Table({tableName: "roleWithModuleAction"})
export class RoleWithModuleAction extends Model {
    @Column({primaryKey : true, autoIncrement: true, type: DataType.INTEGER})
    id!: number;

    @ForeignKey(()=> Role)
    @Column({allowNull : false, type: DataType.INTEGER})
    roleId!: number;

    @ForeignKey(()=>ModuleAction)
    @Column({allowNull : false, type: DataType.INTEGER})
    moduleActionId!: number;

    @Column({allowNull: false, type: DataType.BOOLEAN, defaultValue: false})
    permission!: boolean
}