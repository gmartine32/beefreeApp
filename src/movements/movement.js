import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {User} from '../users/user.js'
import {Store} from '../stores/store.js'

export const Movement = sequelize.define("movements", {
    id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        unique: false,
        },
    type_movement: {
        type: DataTypes.INTEGER,
        unique: false,
        },
    movement_value: {
        type: DataTypes.FLOAT,}, 
},{
    timestamps: true,
});

Movement.belongsTo(User,{
    foreignKey: 'id_user',
    sourceKey:'id',
}) 
Movement.belongsTo(Store,{
    foreignKey: 'id_store',
    sourceKey:'id',
}) 

