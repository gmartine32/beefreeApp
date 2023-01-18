import app from "./app.js";
import pkg from 'dotenv';

pkg.config()
import { sequelize } from "./database/database.js";
import './models/rol.js'
import './models/user.js'
import './models/plataform.js'
import './models/store.js'
import './models/movement.js'



const main = async () => {
  try {
    await sequelize.sync({force: true})
    console.log("Conectado a la base de datos");

 
    app.listen(process.env.PORT);
    console.log("Contectado a productivo xd",process.env.PORT);
  } catch (error) {
    console.log('ERRROR:',error);
  }
};


main();
