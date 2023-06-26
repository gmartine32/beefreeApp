import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {User} from '../users/user.js'


export const ListEstablishment = sequelize.define('ListEstablishment',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,},
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
})


ListEstablishment.belongsTo(User,{
    foreignKey: 'id_user',
    sourceKey:'id',
}) 