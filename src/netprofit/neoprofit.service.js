import { parseQuery } from "../libraries/tools/sql.tools.js";
import { NetProfit } from "./netprofit.js";
import { Op, Sequelize} from "sequelize";
import dayjs from "dayjs";

export const createNetProfit = async ({ id_store, value, date }) => {
  try {
    console.log("creating", {
      valor: value,
      id_store: id_store,
      date_netprofit:
        dayjs(date).startOf("day").toISOString() ||
        dayjs().startOf("day").toDate(),
    });
    console.log(
      "date",
      dayjs(date).startOf("day").toISOString() ||
        dayjs().startOf("day").toDate()
    );
    await NetProfit.create({
      valor: value,
      id_store: id_store,
      date_netprofit:
        dayjs(date).startOf("day").toISOString() ||
        dayjs().startOf("day").toDate(),
    });
    return true;
  } catch (error) {
    console.log("ERROR::", error);
    return false;
  }
};

export const editNetProfit = async (netProfit) => {
  try {
    console.log("OK::", netProfit);
    const np = await NetProfit.findByPk(netProfit.id);
    if (!np) {
      throw new Error("netProfit not found");
    }
    np.valor = netProfit.valor;
    await np.save();
    return true;
  } catch (error) {
    console.log("ERROR::", error);
    return false;
  }
};

export const findNetProfits = async (startDate, endDate, id_store = 0) => {
  try {
    const conditions = {
      date_netprofit: {
        [Sequelize.Op.between]: [startDate, endDate],
      },
    };
    if (id_store != 0) {
      conditions.id_store = id_store;
    }
    console.log("conditions", conditions);
    const netProfits = await NetProfit.findAll({
      where: conditions,
    });
    return parseQuery(netProfits);
  } catch (error) {
    console.log("ERROR::", error);
    return [];
  }
};

export const deleteNetProfitById = async (id) => {
  try {
    const netProfit = await NetProfit.findByPk(id);
    if (!netProfit) throw new Error("netProfit not exist");
    const response = await NetProfit.destroy({ where: { id } });
    return parseQuery(response);
  } catch (error) {
    throw new Error(error);
  }
};
