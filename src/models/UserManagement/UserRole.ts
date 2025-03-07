import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey} from "sequelize-typescript";
import { User } from "./User";
import { Role } from "./Role";


@Table({tableName: "userRole"})
export class UserRole extends Model{
    @Column({primaryKey : true, autoIncrement: true, type: DataType.INTEGER})
    id!: number;

    @ForeignKey(()=> User)
    @Column({allowNull : false, type: DataType.INTEGER})
    userID! : number

    @ForeignKey(()=> Role)
    @Column({allowNull : false, type: DataType.INTEGER})
    roleId!: number
}