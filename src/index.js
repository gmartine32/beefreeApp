import app from "./app.js";
import pkg from 'dotenv';

pkg.config()
import { sequelize } from "./database/database.js";
import './roles/rol.js'
import './users/user.js'
import './plataforms/plataform.js'
import './stores/store.js'
import './movements/movement.js'
import './orders/order.js'
import './stats/stats.js'
import dayjs from "dayjs";
import moment from "moment";



const main = async () => {
  try {
    await sequelize.sync({force: false})
    console.log("Conectado a la base de datos");

 
    app.listen(process.env.PORT, ()=> {
      console.log("Contectado a productivo xd",process.env.PORT);
    })

    setInterval(() => {
      console.log('dayjs',dayjs().format('YYYY-MM-DD HH:mm:ss'))
      console.log('moment',moment().format('YYYY-MM-DD HH:mm:ss'))
      console.log('date',new Date())

    }, 4000);
    
  } catch (error) {
    console.log('ERRROR:',error);
  }
};


main();
