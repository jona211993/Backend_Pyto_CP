import app from './app'
import './database'

const cors = require('cors')
const mongoose = require("mongoose");
// SETTING
app.set("port", process.env.PORT);

//* Uso del CORS
app.use(cors())

// SERVER  ESCUCHANDO
app.listen(app.get("port"), () => {
  console.log("Servidor en puerto", app.get("port"));
});
