import Sequelize from "sequelize";

/* export const sequelize = new Sequelize("beefreedb", "postgres", "123456", {
  dialect: "postgres",
  host: "localhost",
}); */



export const sequelize = new Sequelize('postgres://admin:uaOYWIDnlylRN3Yx1xbxPWsZWMFtg5Yf@dpg-cf2al094reb5o452enpg-a.oregon-postgres.render.com/beefreedb?ssl=true',{keepAliveTimeout:true,logging: true})
