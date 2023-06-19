import express from 'express';
import cors from 'cors';
import rol_router from './roles/rol.routes.js';
import users_router from './users/users.routes.js';
import dashboard_router from './dashboard/dashboard.routes.js';
import movements_router from './movements/movements.routes.js'
import plataforms_router from './plataforms/plataforms.routes.js';
import stores_router from './stores/stores.routes.js'
import order_router from './orders/order.router.js';
import stat_router from './stats/stat.routes.js';
import netprofit_router from './netprofit/netprofit.routes.js'
import establishment_router from './establishment/establishment.routes.js';




const app = express();
app.use(cors())
app.use(express.json());
app.use(rol_router)
app.use(movements_router)
app.use(users_router)
app.use(plataforms_router)
app.use(stores_router)
app.use(dashboard_router)
app.use(order_router)
app.use('/stat',stat_router)
app.use(netprofit_router)
app.use(establishment_router)
export default app;
