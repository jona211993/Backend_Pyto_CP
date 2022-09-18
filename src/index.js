const express = require("express");
const cors = require('cors')
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// CONECTANDO A LA BD MONGO ATLAS
const url = process.env.MONGO_DB_URL;
mongoose
  .connect(url, { dbName: "GesEmp" })
  .then(() => console.log("Conectado a Mongo Atlas"))
  .catch((e) => console.log("Error de conexion" + e));

// SETTING
app.set("port", process.env.PORT || 4000);


//* Uso del CORS
app.use(cors())

// MIDDLEWARES: son funciones
app.use(morgan("dev"));
// este nos ayuda a entender los json que vienen desde el navegador
app.use(express.json());

// ROUTES
// Enlazando el archivo Empleadoss:
// Tambien lee estoy diciendo que todas las rutas van a empezar con / Empleados

// SERVER  ESCUCHANDO
app.listen(app.get("port"), () => {
  console.log("Servidor en puerto", app.get("port"));
});
