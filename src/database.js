import mongoose from 'mongoose'

const url = process.env.MONGO_DB_URL;
mongoose
  .connect(url, { dbName: "PytoAlmacen"
  // ,userNewUrlparser:true,
  // useUnifiedTopology:true,
  // useFindAndModify:true
})
  .then(() => console.log("Conectado a Mongo Atlas"))
  .catch((e) => console.log("Error de conexion" + e));
