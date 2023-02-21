import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {Store} from '../stores/store.js'

export const Stat = sequelize.define("stat", {
    id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
    },
    stat_type:{
        type: DataTypes.STRING,
    },    
},{
    timestamps: true,
});


Stat.belongsTo(Store,{
    foreignKey: 'id_store',
    sourceKey:'id',
}) 

