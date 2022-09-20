import express from 'express'
import morgan from 'morgan'

import { createRoles } from './libs/initialSetup'

import productosRoutes from './routes/producto'
import auhtRoutes from './routes/auth'

const app = express();
createRoles();
app.use(morgan("dev"));
app.use(express.json());
app.use('/api/productos',productosRoutes)
app.use('/api/auth',auhtRoutes)

export default app;