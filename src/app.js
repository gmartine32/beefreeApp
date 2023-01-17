import express from 'express';
import cors from 'cors';
import rol_router from './routes/rol.routes.js';
import movements_router from './routes/movements.routes.js';
import plataforms_router from './routes/plataforms.routes.js';
import stores_router from './routes/stores.routes.js';
import users_router from './routes/users.routes.js';
import dashboard_router from './routes/dashboard.routes.js';


const app = express();
app.use(cors())
app.use(express.json());
app.use(rol_router)
app.use(movements_router)
app.use(users_router)
app.use(plataforms_router)
app.use(stores_router)
app.use(dashboard_router)
app.get('/',(req, res)=>{
    res.json({hola:'perro'})
})
export default app;
