import { Movement } from "./movement.js";
import dayjs from "dayjs";
import { Store } from "../stores/store.js";
import moment from "moment";
import { Op, Sequelize } from "sequelize";
import {
  MOVEMENT_TYPE,
  responseMonthChart,
} from "../libraries/constants/movement.constants.js";
import { parseQuery } from "../libraries/tools/sql.tools.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export const createMovement = async (req, res) => {
  try {
    const {
      description,
      type_movement,
      movement_value,
      id_user,
      id_store,
      createdAt,
    } = req.body;

    if (validateMovementValue(movement_value))
      return res.status(400).json({ message: "invalid movement value" });
    if (validateDescription(description))
      return res.status(400).json({ message: "invalid description" });
    await Movement.create({
      description,
      type_movement,
      movement_value,
      id_user,
      id_store,
      createdAt: createdAt || new Date(),
    });
    return res.status(200).json({ message: "movement created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error creating movement" });
  }
};

export const getMovements = async (req, res) => {
  try {
    const movements = await Movement.findAll({
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ message: "error getting movement" });
  }
};

export const getMovement = async (req, res) => {
  try {
    const { id } = req.params;
    const movement = await Movement.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });
    if (!movement)
      return res.status(404).json({ message: "movement not found" });
    return res.status(200).json(movement);
  } catch (error) {
    return res.status(500).json({ message: "error getting movement" });
  }
};

export const updateMovement = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, type_movement, movement_value, id_user, id_store } =
      req.body;
    const movement = await Movement.findByPk(id);
    if (!movement)
      return res.status(404).json({ message: "movement not found" });
    (movement.description = description),
      (movement.type_movement = type_movement),
      (movement.movement_value = movement_value),
      (movement.id_user = id_user),
      (movement.id_store = id_store);
    await movement.save();
    return res.status(200).json({ message: "movement updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error updating movement" });
  }
};

export const deleteMovement = async (req, res) => {
  try {
    const { id } = req.params;
    const movement = await Movement.findByPk(id);
    if (!movement)
      return res.status(404).json({ message: "movement not found" });
    await movement.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "movement deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error deleting movement" });
  }
};
export const getMovementByStore = async (req, res) => {
  try {
    const { id_store } = { ...req.params };
    let data = await getMovementsByStore(id_store);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "error getting movement by store" });
  }
};
export const getMovementsByWeek = async () => {
  try {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();
    const movements = await Movement.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.between]: [startOfWeek, endOfWeek],
        },
      },
    });
    return movements;
  } catch (error) {
    console.log("@@@@ERROR", error);
  }
};

export const getMovementsByStoreCustomDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, type_movement } = req.body;
    const firstDate = moment(startDate).toDate();
    const secondDate = moment(endDate).toDate();
    console.log("AQUIII", firstDate, secondDate);

    let conditions = {
      createdAt: {
        [Sequelize.Op.between]: [firstDate, secondDate],
      },
      type_movement: type_movement,
    };

    if (id != 0) conditions.id_store = id;
    const order = await Movement.findAll({
      where: conditions,
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });

    if (!order) return res.status(200).json({ message: "order not found" });

    return res.status(200).json(order);
  } catch (error) {}
};

export const getMovementByStoreFilter = async (req, res) => {
  try {
    const { id, filter } = req.params;
    const { type_movement } = req.body;
    const firstDate = moment().startOf(filter).toDate();
    const secondDate = moment().endOf(filter).toDate();
    const conditions = {
      createdAt: {
        [Sequelize.Op.between]: [firstDate, secondDate],
      },
      type_movement: type_movement,
    };
    if (id != 0) conditions.id_store = id;
    const order = await Movement.findAll({
      where: conditions,
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });

    if (!order) return res.status(200).json({ message: "order not found" });

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error getting order" });
  }
};

export const getMovementsByStore = async (id_store) => {
  try {
    const response = await Movement.findAll({
      where: {
        id_store,
      },
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getMovementsStoreByWeek = async (id_store) => {
  try {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();
    const movements = await Movement.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.between]: [startOfWeek, endOfWeek],
        },

        id_store,
      },
    });
    return movements;
  } catch (error) {
    console.log("@@@@ERROR", error);
  }
};
export const getMovementsToday = async () => {
  try {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const movements = await Movement.findAll({
      where: {
        createdAt: {
          [Op.gte]: startOfToday,
          [Op.lt]: new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });
    return movements;
  } catch (error) {
    console.log("@@@@ERROR", error);
  }
};
export const getMovementsStoreToday = async (id_store) => {
  try {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const movements = await Movement.findAll({
      where: {
        createdAt: {
          [Op.gte]: startOfToday,
          [Op.lt]: new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000),
        },
        id_store,
      },
    });
    return movements;
  } catch (error) {
    console.log("@@@@ERROR", error);
  }
};

export const getIncomesValuesByWeek = async () => {
  try {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();

    const values = await Movement.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.between]: [startOfWeek, endOfWeek],
        },
        type_movement: MOVEMENT_TYPE.INCOME,
      },
      attributes: [
        [
          Sequelize.fn("date_part", "dow", Sequelize.col("createdAt")),
          "dayOfWeek",
        ],
        [
          Sequelize.fn("sum", Sequelize.col("movement_value")),
          "movementValueSum",
        ],
      ],
      group: [Sequelize.fn("date_part", "dow", Sequelize.col("createdAt"))],
      raw: true,
    });

    return values;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCostsValuesByWeek = async () => {
  try {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();

    const values = await Movement.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.between]: [startOfWeek, endOfWeek],
        },
        type_movement: MOVEMENT_TYPE.COST,
      },
      attributes: [
        [
          Sequelize.fn("date_part", "dow", Sequelize.col("createdAt")),
          "dayOfWeek",
        ],
        [
          Sequelize.fn("sum", Sequelize.col("movement_value")),
          "movementValueSum",
        ],
      ],
      group: [Sequelize.fn("date_part", "dow", Sequelize.col("createdAt"))],
      raw: true,
    });

    return values;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getIncomesStoreValuesByWeek = async (id_store) => {
  try {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();

    const values = await Movement.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.between]: [startOfWeek, endOfWeek],
        },
        type_movement: MOVEMENT_TYPE.INCOME,
        id_store,
      },
      attributes: [
        [
          Sequelize.fn("date_part", "dow", Sequelize.col("createdAt")),
          "dayOfWeek",
        ],
        [
          Sequelize.fn("sum", Sequelize.col("movement_value")),
          "movementValueSum",
        ],
      ],
      group: [Sequelize.fn("date_part", "dow", Sequelize.col("createdAt"))],
      raw: true,
    });

    return values;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCostsStoreValuesByWeek = async (id_store) => {
  try {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();

    const values = await Movement.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.between]: [startOfWeek, endOfWeek],
        },
        type_movement: MOVEMENT_TYPE.COST,
        id_store,
      },
      attributes: [
        [
          Sequelize.fn("date_part", "dow", Sequelize.col("createdAt")),
          "dayOfWeek",
        ],
        [
          Sequelize.fn("sum", Sequelize.col("movement_value")),
          "movementValueSum",
        ],
      ],
      group: [Sequelize.fn("date_part", "dow", Sequelize.col("createdAt"))],
      raw: true,
    });

    return values;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getValuesChartDataMounth = async (id_store, type_movement) => {
  try {
    const startOfYear = moment().startOf("year");
    const endOfYear = moment().endOf("year");
    let conditions = {
      createdAt: {
        [Sequelize.Op.between]: [startOfYear, endOfYear],
      },
      type_movement: type_movement,
      id_store,
    };
    if (conditions.id_store === undefined) delete conditions.id_store;

    const data = await Movement.findAll({
      where: conditions,
      attributes: [
        [
          Sequelize.fn("date_part", "month", Sequelize.col("createdAt")),
          "month",
        ],
        [
          Sequelize.fn("sum", Sequelize.col("movement_value")),
          "movementValueSum",
        ],
      ],
      group: [Sequelize.fn("date_part", "month", Sequelize.col("createdAt"))],
      raw: true,
    });
    console.log("dataaaa", data);
    return parseDataChartMonth(data);
  } catch (error) {
    console.log(error);
  }
};

export const filterMovementsByType = (movements, type_movement) => {
  return movements.filter(
    (movement) => movement.type_movement === type_movement
  );
};

export const parseDataChartMonth = (data) => {
  const newResponse = [...responseMonthChart];
  data.forEach(
    (res) =>
      (newResponse[res.month - 1] = {
        movementValueSum: res.movementValueSum,
        monthOfYear: res.month,
      })
  );

  return newResponse;
};

export const validateMovementValue = (value) => {
  return isNaN(value) || value < 0;
};
export const validateDescription = (description) => {
  return description && description.trim() == "";
};

export const getIncomesValue = async (startDate, endDate) => {
  try {
    console.log(startDate, endDate);
    const response = await Movement.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("movement_value")), "total"],
        "id_store",
      ],
      include: [
        {
          model: Store,
          attributes: [],
        },
      ],
      where: {
        createdAt: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
        type_movement: 1,
      },
      group: ["id_store"],
    });
    console.log("praa", response);

    return parseQuery(response);
  } catch (error) {
    console.log(error);
  }
};

export const getIncomesValues = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    console.log("@@@ hola");
    const firstDate = moment(startDate).toDate();
    const secondDate = moment(endDate).toDate();
    const data = await getIncomesValue(firstDate, secondDate);
    res.status(200).json(data || []);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getIncomesValuesFilter = async (req, res) => {
  try {
    const { filter } = req.params;
    const firstDate = moment().startOf(filter).toDate();
    const secondDate = moment().endOf(filter).toDate();
    const data = await getIncomesValue(firstDate, secondDate);
    res.status(200).json(data || []);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getIncomebyYears = async (req, res) => {
  try {
    const { date, id_store } = req.body;
    const response = await getIncomebyYear(date, id_store);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error getting dataa" });
  }
};

export const getIncomebyYear = async (date, id_store) => {
  try {
    const currentYear = new Date(date).getFullYear();

    let conditions = {
      type_movement: 1,
      createdAt: {
        [Op.gte]: new Date(currentYear, 0, 1),
        [Op.lt]: new Date(currentYear + 1, 0, 1),
      },
    };
    if (id_store != 0) conditions.id_store = id_store;

    console.log("conditions", conditions);
    const incomeByYearQuarter = await Movement.findAll({
      attributes: [
        [
          Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "createdAt"')),
          "year",
        ],
        [
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('QUARTER FROM "createdAt"')
          ),
          "quarter",
        ],
        [
          Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "createdAt"')),
          "month",
        ],
        [
          Sequelize.fn("SUM", Sequelize.col("movement_value")),
          "total_movement_value",
        ],
      ],
      where: conditions,
      group: ["year", "quarter", "month"],
      order: [
        ["year", "ASC"],
        ["quarter", "ASC"],
        ["month", "ASC"],
      ],
    });
    console.log("resss", incomeByYearQuarter);

    return transformData(parseQuery(incomeByYearQuarter));
  } catch (error) {
    console.log("jujuju", error);
    throw new Error(error);
  }
};

const transformData = (data) => {
  const result = [];

  // Create an array of all possible quarter-month combinations
  const quarterMonths = [1, 2, 3].flatMap((month) =>
    [1, 2, 3, 4].map((quarter) => ({ month, quarter }))
  );

  // Loop through each quarter-month combination
  quarterMonths.forEach(({ month, quarter }) => {
    // Find the data object with the matching quarter and month, or create a new one with total_movement_value of 0
    const monthData = data.find(
      (item) => item.quarter == quarter && item.month == month
    ) || {
      year: data[0].year,
      quarter,
      month,
      total_movement_value: 0,
    };
    result.push(monthData);
  });

  return result;
};

export const getIncomesCountTodayByHour = async (req, res) => {
  try {
    const { id_store } = req.params;

    const response = await getMovementByHour(id_store);
    console.log("RESPONSE", response);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "error getting incomes today" });
  }
};

const getMovementByHour1 = async (store_id) => {
  try {
    console.log(moment());

    const where = {
      type_movement: 1,
      createdAt: { [Sequelize.Op.gte]: moment().startOf("day").toDate() },
    };
    if (store_id !== 0) where.id_store = store_id;

    const movementsByHour = await Movement.findAll({
      where,
      attributes: [
        [
          Sequelize.fn(
            "DATE_TRUNC",
            Sequelize.literal("hour"),
            Sequelize.col("createdAt")
          ),
          "hour",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: "hour",
      raw: true,
    });

    return parseQuery(movementsByHour);
  } catch (error) {
    console.log(error);
  }
};
async function getMovementByHour(id_store) {
  try {
    const nowDayJs = dayjs().subtract(5,'hours')
    const now = nowDayJs.toDate();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1);
    console.log("now", now);
    console.log("startOfDay", startOfDay);
    console.log("endOfDay", endOfDay);

    const conditions = {
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
      type_movement: 1,
    };
    if (id_store != 0) conditions.id_store = id_store;
    // Obtener la fecha de inicio y fin del día actual

    const movementsByHour = await Movement.findAll({
      where: conditions,
    });
    // Realizar una consulta que agrupe los movimientos por hora del día actual y cuente los registros en cada grupo
    console.log("LOG1", countMovementsByHour(parseQuery(movementsByHour)));
    return countMovementsByHour(parseQuery(movementsByHour));
  } catch (error) {
    console.log(error);
  }
  // Imprimir el resultado en la consola
}

function countMovementsByHour(movements) {
  const sumatoriasPorHora = {};
  for (let hora = 0; hora <= 23; hora++) {
    sumatoriasPorHora[hora] = 0;
  }
  for (let movimiento of movements) {
    const horaUtc = dayjs.utc(movimiento.createdAt).hour();
    const hora = (horaUtc - 5 + dayjs().utcOffset() / 60 + 24) % 24;
    sumatoriasPorHora[hora] += movimiento.movement_value;
  }
  return sumatoriasPorHora;
}

export const getCostToChartFilter = async (req, res) => {
  try {
    const { filter, typeCost } = req.body;
    const firstDate = moment().startOf(filter).toDate();
    const secondDate = moment().endOf(filter).toDate();
    const data = await getCostalue(firstDate, secondDate, typeCost);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const getCostToChart = async (req, res) => {
  try {
    const { startDate, endDate, typeCost } = req.body;
    const firstDate = moment(startDate).toDate();
    const secondDate = moment(endDate).toDate();
    const data = await getCostalue(firstDate, secondDate, typeCost);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const getCostalue = async (startDate, endDate, typeCost) => {
  try {
    console.log(startDate, endDate);
    const response = await Movement.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("movement_value")), "total"],
        "id_store",
      ],
      include: [
        {
          model: Store,
          attributes: [],
        },
      ],
      where: {
        createdAt: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
        type_movement: 0,
        description: {
          [Op.iLike]: `%${typeCost}%`,
        },
      },
      group: ["id_store"],
    });
    console.log("praa", response);

    return parseQuery(response);
  } catch (error) {
    console.log(error);
  }
};
