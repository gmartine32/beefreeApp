import { Movement } from "../movements/movement.js";
import moment from "moment";
import { Sequelize } from "sequelize";
import {
  filterMovementsByType,
  getCostsStoreValuesByWeek,
  getCostsValuesByWeek,
  getIncomesStoreValuesByWeek,
  getIncomesValuesByWeek,
  getMovementsByWeek,
  getMovementsStoreByWeek,
  getMovementsStoreToday,
  getMovementsToday,
  getValuesChartDataMounth,
} from "../movements/movements.controller.js";
import { parseQuery } from "../libraries/tools/sql.tools.js";
import { MOVEMENT_TYPE, responseWeekChart } from "../libraries/constants/movement.constants.js";

export const getIndicatorsAll = async (_req, res) => {
  try {
    const movementsWeek = parseQuery(await getMovementsByWeek());
    const movementsToday = parseQuery(await getMovementsToday());
    const incomesWeek = filterMovementsByType(
      movementsWeek,
      MOVEMENT_TYPE.INCOME
    ).reduce((prev, current) => prev + current.movement_value, 0);
    const costsWeek = filterMovementsByType(
      movementsWeek,
      MOVEMENT_TYPE.COST
    ).reduce((prev, current) => prev + current.movement_value, 0);
    const incomesToday = filterMovementsByType(
      movementsToday,
      MOVEMENT_TYPE.INCOME
    ).reduce((prev, current) => prev + current.movement_value, 0);
    const costsToday = filterMovementsByType(
      movementsToday,
      MOVEMENT_TYPE.COST
    ).reduce((prev, current) => prev + current.movement_value, 0);

    return res
      .status(200)
      .json({ incomesWeek, costsWeek, incomesToday, costsToday });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error getting indicators" });
  }
};

export const getIndicatorsStore = async (req, res) => {
  try {
    const { id_store } = { ...req.params };
    const movementsWeek = parseQuery(await getMovementsStoreByWeek(id_store));
    const movementsToday = parseQuery(await getMovementsStoreToday(id_store));
    const incomesWeek = filterMovementsByType(
      movementsWeek,
      MOVEMENT_TYPE.INCOME
    ).reduce((prev, current) => prev + current.movement_value, 0);
    const costsWeek = filterMovementsByType(
      movementsWeek,
      MOVEMENT_TYPE.COST
    ).reduce((prev, current) => prev + current.movement_value, 0);
    const incomesToday = filterMovementsByType(
      movementsToday,
      MOVEMENT_TYPE.INCOME
    ).reduce((prev, current) => prev + current.movement_value, 0);
    const costsToday = filterMovementsByType(
      movementsToday,
      MOVEMENT_TYPE.COST
    ).reduce((prev, current) => prev + current.movement_value, 0);

    return res
      .status(200)
      .json({ incomesWeek, costsWeek, incomesToday, costsToday });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error getting indicators" });
  }
};

export const getIncomeChartDataWeek = async (req, res) => {
  try {
    const data = await getIncomesValuesByWeek();
    console.log("AAAAAAAAAAAAAAAAAAAAA",data);
    return res.status(200).json(parseDataChartWeek(data));
  } catch (error) {
    return res.status(500).json({ message: "error getting data" });
  }
};
 export const parseDataChartWeek = (data)=>{
  
  const newResponse = [...responseWeekChart]
  data.forEach((res)=>newResponse[res.dayOfWeek]={"movementValueSum":res.movementValueSum, "dayOfWeek":res.dayOfWeek})

  return newResponse

 }
export const getIncomeStoreChartDataWeek = async (req, res) => {
  try {
    const { id_store } = { ...req.params };
    const data = await getIncomesStoreValuesByWeek(id_store);
    console.log(data);
    return res.status(200).json(parseDataChartWeek(data));
  } catch (error) {
    return res.status(500).json({ message: "error getting data" });
  }
};
export const getCostsChartDataWeek = async (req, res) => {
  try {
    const data = await getCostsValuesByWeek();
    console.log(data);
    return res.status(200).json(parseDataChartWeek(data));
  } catch (error) {
    return res.status(500).json({ message: "error getting data" });
  }
};

export const getCostsStoreChartDataWeek = async (req, res) => {
  try {
    const { id_store } = { ...req.params };
    const data = await getCostsStoreValuesByWeek(id_store);
    console.log(data);
    return res.status(200).json(parseDataChartWeek(data));
  } catch (error) {
    return res.status(500).json({ message: "error getting data" });
  }
};


export const getValuesChartDataMonth = async (req, res) =>{
  try {
    const { type_movement, id_store } = { ...req.params };
    const data = await getValuesChartDataMounth(id_store, type_movement)
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'error gettins values by months'});
  }
}

