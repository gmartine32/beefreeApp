import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { Op, Sequelize } from "sequelize";
import { parseQuery } from "../libraries/tools/sql.tools.js";

import { Store } from "../stores/store.js";
import { Order } from "./order.js";

export const createOrders = async (order) => {
  try {
    const response = await Order.create({
      ...order,
    });
    return parseQuery(response);
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await Order.findAll({
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });

    return parseQuery(response);
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await Order.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });
    return parseQuery(response);
  } catch (error) {
    throw new Error(error);
  }
};

export const gerOrderByStore = async (id_store) => {
  try {
    const response = await Order.findAll({
      where: {
        id_store: id_store,
      },
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });
    return parseQuery(response);
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrderByStoreRangeDate = async (id_store,startDate,endDate) => {
  try {
    const firstDate = `${dayjs(startDate).format('YYYY-MM-DD')} 00:00:00.000 -05:00`;
    const secondDate = `${dayjs(endDate).format('YYYY-MM-DD')} 23:59:59.999 -05:00`;
    let conditions = {
      sale_date: {
        [Sequelize.Op.between]: [firstDate, secondDate],
      },
    };
    if (id_store != 0) conditions.id_store = id_store;
    const response = await Order.findAll({
      where: conditions,
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });
    return parseQuery(response);
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrderByStoreOnFilter = async (id_store, filter) => {
  try {
    const firstDate = filter == 'day' ?`${dayjs().subtract(5,'hour').format('YYYY-MM-DD')} 00:00:00.000 -05:00` : dayjs().subtract(5,'hour').startOf(filter).toDate();
    const secondDate = filter == 'day' ?`${dayjs().subtract(5,'hour').format('YYYY-MM-DD')} 23:59:59.999 -05:00` : dayjs().subtract(5,'hour').endOf(filter).toDate();

    const conditions = {
      sale_date: {
        [Sequelize.Op.between]: [firstDate, secondDate],
      },
    };
    if (id_store != 0) conditions.id_store = id_store;
    const response = await Order.findAll({
      where: conditions,
      include: [
        {
          model: Store,
          attributes: ["name"],
        },
      ],
    });
    return parseQuery(response);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOrderById = async (id) => {
  try {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not exist");
    const response = await Order.destroy({
      where: {
        id,
      },
    });
    return parseQuery(response);
  } catch (error) {
    throw new Error(error);
  }
};
export const getDataCitiesByStoreFilter = async (id_store, filter) => {
  try {
    const orders = await getOrderByStoreOnFilter(id_store, filter);
    const cities = orders.map((order) => `${order.ship_state}`);
    const coordenadas = await getDataOrderCity(cities);
    return coordenadas;
  } catch (error) {
    throw new Error(error);
  }
};
export const getDataOrderCityRangeDate = async (
  id_store,
  startDate,
  endDate
) => {
  try {
    const orders = await getOrderByStoreRangeDate(id_store, startDate, endDate);

    const filteredOrders = orders.map(order =>({...order,ship_state:order.ship_country != 'United States' ? '':order.ship_state}));
    const cities = filteredOrders.map((order) => `${order.ship_state}`);
    const coordenadas = await getDataOrderCity(cities);
    return coordenadas;
  } catch (error) {
    throw new Error(error);
  }
};
export const getDataOrderCity = async (cityNames) => {
  try {
    let response = [];
    const url = process.env.HOST_API_MAP;
    const ciudadesUnicas = Array.from(new Set(cityNames));
    const conteosCiudades = ciudadesUnicas.map((ciudad) => ({
      nombre: ciudad,
      cantidad: cityNames.filter((c) => c === ciudad).length,
    }));
    const promesas = ciudadesUnicas.map((ciudad) => {
      if (ciudad.trim()=='') return {ciudad:'other cities',latitud:0,longitud:0}
      const params = { q: ciudad, key: process.env.API_KEY_MAP };
      return axios.get(url, { params }).then((response) => {
        const data = response.data;
        const lat = data.results[0].geometry.lat;
        const lng = data.results[0].geometry.lng;
        return { ciudad, latitud: lat, longitud: lng };
      });
    });
    await Promise.allSettled(promesas).then((coordenadas) => {
      // Combina los datos de cantidad y coordenadas para crear el array de JSONs final

      console.log('aaaa',coordenadas)
      const resultados = conteosCiudades.map((ciudad) => {
        const { nombre, cantidad } = ciudad;
        const { value } = coordenadas.find((c) => c.value.ciudad === (nombre == '' ? 'other cities':nombre));
        return {
          ciudad: nombre,
          cantidad,
          coordenadas: [value.latitud, value.longitud],
        };
      });
      response = resultados;
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getOrderStateAtRangeDate = async (id_store,startDate,endDate) => {
  try {
  const firstDate = `${dayjs(startDate).format('YYYY-MM-DD')} 00:00:00.000 -05:00`;
    const secondDate =`${dayjs(endDate).format('YYYY-MM-DD')} 23:59:59.999 -05:00`;
    let conditions = {
      sale_date: {
        [Sequelize.Op.between]: [firstDate, secondDate],
      },
    };
    if (id_store != 0) conditions.id_store = id_store;
    const orders = await getOrderByStates(conditions)
    return orders
  } catch (error) {
    throw new Error(error);
  }
}

export const getStatesByStoreFilter = async (id_store, filter) => {
  try {

    const firstDate = filter == 'day' ?`${dayjs().subtract(5,'hour').format('YYYY-MM-DD')} 00:00:00.000 -05:00` : dayjs().subtract(5,'hour').startOf(filter).toDate();
    const secondDate = filter == 'day' ?`${dayjs().subtract(5,'hour').format('YYYY-MM-DD')} 23:59:59.999 -05:00` : dayjs().subtract(5,'hour').endOf(filter).toDate();


    let conditions = {
      sale_date: {
        [Sequelize.Op.between]: [firstDate, secondDate],
      },
    };
    if (id_store != 0) conditions.id_store = id_store;
    const orders = await getOrderByStates(conditions)
    console.log('@@',orders)
    return orders
  } catch (error) {
    throw new Error(error);
  }
};


const getOrderByStates = async (conditions) =>{
  try {
    const response = await Order.findAll({
      where: conditions,
      attributes: [
        'ship_state',
        [Sequelize.fn('sum', Sequelize.col('item_total')), 'total'],
        [Sequelize.fn('sum', Sequelize.col('quantity')), 'quantity_sum'],
        [Sequelize.fn('count', Sequelize.col('id')), 'num_orders'],
      ],
      group: ['ship_state'],
    });

    return parseQuery(response);
  } catch (error) {
    
  }
}
