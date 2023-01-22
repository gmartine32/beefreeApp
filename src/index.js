import app from "./app.js";
import pkg from 'dotenv';

pkg.config()
import { sequelize } from "./database/database.js";
import './roles/rol.js'
import './users/user.js'
import './plataforms/plataform.js'
import './stores/store.js'
import './movements/movement.js'



const main = async () => {
  try {
    await sequelize.sync({force: false})
    console.log("Conectado a la base de datos");

 
    app.listen(process.env.PORT);
    console.log("Contectado a productivo xd",process.env.PORT);
  } catch (error) {
    console.log('ERRROR:',error);
  }
};


main();
