import Sequelize from "sequelize";

// export const sequelize = new Sequelize("beefreedb", "admin", "123456", {
//   dialect: "postgres",
//   host: "localhost",
// });


const databaseUrl = 'postgres://admin:123456@localhost:5432/beefreedb';
export const sequelize = new Sequelize(databaseUrl,{keepAliveTimeout:true,logging: true});

// export const sequelize = new Sequelize('postgres://admin:uaOYWIDnlylRN3Yx1xbxPWsZWMFtg5Yf@dpg-cf2al094reb5o452enpg-a.oregon-postgres.render.com/beefreedb?ssl=true',{keepAliveTimeout:true,logging: true, timezone: 'America/Bogota',})
