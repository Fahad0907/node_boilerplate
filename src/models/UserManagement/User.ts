import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, BelongsToMany} from "sequelize-typescript";
import { Role } from "./Role";
import { UserRole } from "./UserRole";


@Table({tableName : "user"})
export class User extends Model{
    @Column({primaryKey : true, autoIncrement: true, type: DataType.INTEGER})
    id!: number;

    @Column({allowNull: false, unique : true, type: DataType.STRING})
    email!: string;

    @Column({allowNull: false, unique : true, type: DataType.STRING})
    username!: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
    isSuperUser!: boolean;

    @Column({allowNull : false, type: DataType.STRING})
    password!: string;

    @BelongsToMany(()=> Role, ()=>UserRole)
    roles!: Role[]

}