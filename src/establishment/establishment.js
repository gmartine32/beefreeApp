import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from '../users/user.js'
import { ListEstablishment } from "../listEstablishment/listEstablishment.js";



export const Establishment = sequelize.define('establishment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },   
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    tags: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    notes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    establishment_topic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})


Establishment.belongsTo(User, {
    foreignKey: 'id_user',
    sourceKey: 'id',
}) 

Establishment.belongsTo(ListEstablishment, {
    foreignKey: 'id_listEstablishment',
    sourceKey: 'id',
}) 