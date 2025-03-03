import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsToMany} from "sequelize-typescript";
import { UserRole } from "./UserRole";
import { User } from "./User";
import { ModuleAction } from "./ModuleAction";
import { RoleWithModuleAction } from "./RoleWithModuleAction";

@Table({tableName : "role"})
export class Role extends Model{
    @Column({primaryKey : true, autoIncrement: true, type: DataType.INTEGER})
    id!: number;

    @Column({allowNull : false, type: DataType.STRING})
    name!: string;

    @BelongsToMany(()=> User , ()=> UserRole)
    users!: User[]

    @BelongsToMany(()=>ModuleAction, ()=> RoleWithModuleAction)
    moduleAction!: ModuleAction[]
}