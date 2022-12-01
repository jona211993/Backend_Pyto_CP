import { Schema,model } from "mongoose";

const itemSchema = new Schema(
{
    id_movimiento:{
        type: Schema.Types.ObjectId
    },
    codigo_product:{
        type:String        
    },
    name_product:{
        type: String
     },  
    description:{
        type:String,
    
    },
    categoria:{
        type:String       
    },
    stock:{
     type: Number
    },
    precio:{
        type:Number     
    },
    cantidad:{
        type: Number       
    },  
},
  // esto ultimo que coloco es para que identifique a la coleccion en la
  // que deseo trabajar, antes me creaba una nueva.
{ collection: 'item_p' },
{timestamps: true , versionKey:false},

);

// El esquema ayuda a decirle a mongo db como van a lucir los datos
// CREANDO MODELOS:

let M_item = model('m_item_p',itemSchema);
module.exports = M_item;