import { Plataform } from "./plataform.js";
import { existStoreByPlataform } from "../stores/stores.controller.js";

export const createPlataform = async (req, res) => {
  try {
    const { name, email, link } = req.body;
    if (await validateNamePlaform(name))
      return res.status(400).json({ message: "plataform already exists" });
    if (await validateLinkPlaform(link))
      return res.status(400).json({ message: "link already exists" });
    if (await validateEmailPlaform(email))
      return res.status(400).json({ message: "email already exists" });
    await Plataform.create({
      name,
      email,
      link,
    });
    return res.status(201).json({ message: "plataform created" });
  } catch (error) {
    return res.status(500).json({ message: "error creating plataform" });
  }
};

export const getPlataforms = async (req, res) => {
  try {
    const plataform = await Plataform.findAll();
    res.status(200).json(plataform);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPlataform = async (req, res) => {
  try {
    const { id } = req.params;
    const plataform = await Plataform.findByPk(id);
    if (!plataform)
      return res.status(404).json({ message: "plataform not found" });
    return res.status(200).json(plataform);
  } catch (error) {
    return res.status(500).json({ message: "error getting plataform" });
  }
};

export const updatePlataform = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, link } = req.body;
    const plataform = await Plataform.findByPk(id);
    if (!plataform)
      return res.status(404).json({ message: "plataform not found" });
    plataform.name = name;
    plataform.email = email;
    plataform.link = link;
    await plataform.save();
    return res.status(200).json({ message: "plataform updated" });
  } catch (error) {
    return res.status(500).json({ message: "error updating plataform" });
  }
};

export const deletePlataform = async (req, res) => {
  try {
    const { id } = req.params;
    if(await existStoreByPlataform(id)) return res.status(409).json({message:'not allowed delete this plataform'})
    const plataform = await Plataform.findByPk(id);
    if (!plataform)
      return res.status(404).json({ message: "plataform not found" });
    await plataform.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "plataform deleted" });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "error deleting plataform" });
  }
};

const validateNamePlaform = async (name) => {
  const plataforms = await Plataform.findAll();
  return plataforms.some((plataform) => plataform.name === name);
};
const validateLinkPlaform = async (link) => {
  const plataforms = await Plataform.findAll();
  return plataforms.some((plataform) => plataform.link === link);
};
const validateEmailPlaform = async (email) => {
  const plataforms = await Plataform.findAll();
  return plataforms.some((plataform) => plataform.email === email);
};
