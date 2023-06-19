import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {User} from '../users/user.js'


export const Establishment = sequelize.define('establishment',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,},
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    establishment_topic:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
})


Establishment.belongsTo(User,{
    foreignKey: 'id_user',
    sourceKey:'id',
}) 