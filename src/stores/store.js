import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {Plataform} from '../plataforms/plataform.js'
export const Store = sequelize.define("store", {
    id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,},
    name: {
        type: DataTypes.STRING,
        unique: true,},
    }      
);

Store.belongsTo(Plataform,{
    foreignKey: 'id_plataform',
    sourceKey:'id'
}) 
