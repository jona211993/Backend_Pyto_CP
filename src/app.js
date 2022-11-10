import express from 'express'
import morgan from 'morgan'

import { createRoles } from './libs/initialSetup'

import productosRoutes from './routes/producto'
import categoriaRoutes from './routes/categoria'
import auhtRoutes from './routes/auth'
import usersRoutes from './routes/user'

const cors = require('cors')
let corsOptions = {
    origin: '*' // Compliant
  };
let app = express();
app.disable("x-powered-by");
app.use(cors(corsOptions))
createRoles();
app.use(morgan("dev"));
app.use(express.json());
app.use('/api/productos',productosRoutes)
app.use('/api/categoria',categoriaRoutes)
app.use('/api/auth',auhtRoutes)
app.use('/api/users',usersRoutes)


export default app;