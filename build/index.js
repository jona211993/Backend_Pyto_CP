"use strict";

var express = require("express");

var cors = require('cors');

var morgan = require("morgan");

var mongoose = require("mongoose");

var app = express();

require("dotenv").config(); // CONECTANDO A LA BD MONGO ATLAS


var url = process.env.MONGO_DB_URL;
mongoose.connect(url, {
  dbName: "PytoAlmacen"
}).then(function () {
  return console.log("Conectado a Mongo Atlas");
})["catch"](function (e) {
  return console.log("Error de conexion" + e);
}); // SETTING

app.set("port", process.env.PORT); //* Uso del CORS

app.use(cors()); // MIDDLEWARES: son funciones

app.use(morgan("dev")); // este nos ayuda a entender los json que vienen desde el navegador

app.use(express.json()); // ROUTES
// Enlazando el archivo Empleadoss:
// Tambien lee estoy diciendo que todas las rutas van a empezar con / Empleados

app.use("/", require("./routes/producto")); // SERVER  ESCUCHANDO

app.listen(app.get("port"), function () {
  console.log("Servidor en puerto", app.get("port"));
});