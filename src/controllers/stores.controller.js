import { Plataform } from "../models/plataform.js";
import { Store } from "../models/store.js";
export const createStore = async (req, res) => {
  try {
    const { name, id_plataform } = req.body;
    if (await validateNameStore(name))
      return res.status(400).json({ message: "store already exists" });

    await Store.create({ name, id_plataform });
    res.status(201).json({ message: "store created successfully" });
  } catch (error) {
    res.status(500).json({ message: "error creating store" });
  }
};

export const getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include:[
        {
          model:Plataform,
          attributes:['name']
        }
      ]
    });
    return res.status(200).json(stores);
  } catch (error) {
    return res.status(500).json({ message: "error getting stores" });
  }
};

export const getStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findOne({
      where:{
        id:id
      },
      include:[
        {
          model:Plataform,
          attributes:['name']
        }
      ]
    });
    if (!store) return res.status(404).json({ message: "store not found" });
    console.log(store)
    return res.status(200).json(store);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error getting store" });
  }
};

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, id_plataform } = req.body;
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: "store not found" });
    store.name = name;
    store.id_plataform = id_plataform;
    await store.save();
    return res.status(200).json({ message: "store updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error updating store" });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const { id } = { ...req.params };
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: "store not found" });
    await store.destroy({
      where: {
        id,
      }
    });
    return res.status(200).json({ message: "store deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error deleting store" });
  }
};

const validateNameStore = async (name) => {
  const stores = await Store.findAll();
  return stores.some((store) => store.name == name);
};
