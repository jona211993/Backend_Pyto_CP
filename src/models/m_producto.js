import { Schema,model } from 'mongoose';

const producto = new Schema({
    codigo: Number,
    nombre: String,
    stock:Number,
    costo: Number,
    descripcion:String,
    precio:Number,
    
  // esto ultimo que coloco es para que identifique a la coleccion en la
  // que deseo trabajar, antes me creaba una nueva.
}, { collection: 'producto' });

// El esquema ayuda a decirle a mongo db como van a lucir los datos

// CREANDO MODELOS:

let M_products = model('m_producto',producto);
module.exports = M_products;