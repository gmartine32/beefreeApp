import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {Rol} from './rol.js'
export const User = sequelize.define("user", {
    id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,},
    username: {
        type: DataTypes.STRING,
        unique: true,},
    email: {
        type: DataTypes.STRING,
        unique: true,},
    password: {
        type: DataTypes.STRING,},
    name: {
        type: DataTypes.STRING,
        unique: false,},
    }      
);

User.belongsTo(Rol,{
    foreignKey: 'id_rol',
    sourceKey:'id'
}) 
