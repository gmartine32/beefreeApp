import { Rol } from "./rol.js";

export const createRol = async (req, res) => {
  try {
    const { name } = req.body;
    if (await validateRol(name)) {
      return res.status(400).json({ message: "role already exists" });
    }
    await Rol.create({ name });
    return res.status(201).json({ message: "Role created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Role not created" });
  }
};

export const getRols = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getRol = async (req, res) => {
   try {
    const {id} = req.params;
    const role = await Rol.findOne({
        where:{
            id
        }
    })
    if(!role) return res.status(404).json({message:'Role not found'})
    return res.status(200).json(role)
   } catch (error) {
    return res.status.json({message:'Error getting role'})
   } 
}

export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    await Rol.destroy({
      where: { id },
    });
    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error deleting Role " });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (await validateRol(name))
      return res.status(400).json({ message: "name already exists" });
    const role = await Rol.findByPk(id);
    if (!role) return res.status(404).json({ message: "Role not found"})
    role.name = name;
    await role.save();
    return res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const validateRol = async (name) => {
  const roles = await Rol.findAll();
  return roles.some((rol) => rol.name == name);
};
