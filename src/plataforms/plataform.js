import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Plataform = sequelize.define("plataform", {
    id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,},
    name: {
        type: DataTypes.STRING,
        unique: true,},
    email: {
        type: DataTypes.STRING,
        unique: true,},
    link: {
        type: DataTypes.STRING,},
    
    }     
);
