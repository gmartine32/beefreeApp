import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
import { parseQuery } from "../libraries/tools/sql.tools.js";

export const createUser = async (req, res) => {
  try {
    const { username, password, name, email, id_rol } = req.body;
    if (await validateUsername(username))
      return res.status(400).json({ message: "username already in use" });
    if (await validateEmailUser(email))
      return res.status(400).json({ message: "email already in use" });

    await User.create({
      username,
      password,
      name,
      email,
      id_rol,
    });
    return res.status(201).json({ message: "user created" });
  } catch (error) {
    return res.status(500).json({ message: 'error creating user' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    return res.status(200).json(user);
    
  } catch {
    return res.status(500).json({ message: "error getting user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, id_rol } = req.body;
    if (await validateUsername(username))
      return res.status(400).json({ message: "username already in use" });
    if (await validateEmailUser(email))
      return res.status(400).json({ message: "email already in use" });
    const user = await User.findByPk(id);
    await user.update({ username, password, name, email, id_rol }, { where: { id }})
    if (!user) return res.status(404).json({ message: "user not found" });
    user.username = username;
    user.password = password;
    user.name = name;
    user.email = email;
    user.id_rol = id_rol;
    await user.save();
    return res.status(200).json({ message: "user updated" });
  } catch {
    return res.status(500).json({ message: "error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    await user.destroy({
      where:{
        id
      }
    });
    return res.status(200).json({ message: "user deleted" });
  } catch {
    return res.status(500).json({ message: "error deleting user" });
  }
};

export const authUser = async (req, res) => {
  try {
    const {username, password} = {...req.body};
    const user = await User.findOne({
      where:{
        username
      }
    })
    if (!user) return res.status(404).json({ message: "Username not registered" });
    if(user.password != password) return res.status(401).json({message: "Incorrect password"})
    const token = generateToken(parseQuery( user))
    res.status(202).json({token:token, user:user})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Technical error" });
  }
}

const generateToken = (user)=>{
  return jwt.sign( user,process.env.PASSWORD_SICRET,{expiresIn:'15m'})
}
export const validateUsername = async (username) => {
  const users = await User.findOne({where: {username: username}});
  return Boolean(users);
};
export const validateEmailUser = async (email) => {
  const users = await User.findAll();
  return users.some((user) => user.email === email);
};
