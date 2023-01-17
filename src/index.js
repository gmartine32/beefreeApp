import app from "./app.js";
import { sequelize } from "./database/database.js";
import './models/rol.js'
import './models/user.js'
import './models/plataform.js'
import './models/store.js'
import './models/movement.js'



const main = async () => {
  try {
    await sequelize.sync({force: false})
    console.log("Conectado a la base de datos");

 
    app.listen(5000);
    console.log("Contectado a productivo xd");
  } catch (error) {
    console.log(error);
  }
};

main();
