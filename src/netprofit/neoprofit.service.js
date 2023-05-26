import { parseQuery } from "../libraries/tools/sql.tools";
import { NetProfit } from "./netprofit";

const createNetProfit = async ({ id_store, value, date }) => {
  try {
    await NetProfit.create({
      valor: value,
      id_store: id_store,
      date_netprofit: date || new Date(),
    });
    return true;
  } catch (error) {
    console.log("ERROR::", error);
    return false;
  }
};

const editNetProfit = async (netProfit) => {
  try {
    const np = await NetProfit.findByPk(netProfit.id);
    if (!np) {
      throw new Error("netProfit not found");
    }

    for (let key in np) {
      np[key] = netProfit[key];
    }
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
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    };
    if (id_store != 0) {
      conditions.id_store = id_store;
    }
    const netProfits = await NetProfit.findAll({
      where: conditions,
    });
    return parseQuery(netProfits)
  } catch (error) {
    console.log("ERROR::", error);
    return [];
  }
};

