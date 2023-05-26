import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Store } from "../stores/store.js";

export const NetProfit = sequelize.define("netprofit", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_netprofit: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: "store_date_netprofit_constraint"
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

NetProfit.belongsTo(Store, {
  foreignKey: "id_store",
  unique: "store_date_netprofit_constraint"
});