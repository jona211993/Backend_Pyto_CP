const mongoose=require('mongoose')
const {Schema}=mongoose

const Pedido=new Schema({
    titulo:String,
    descripcion:String
})

mongoose.exports = mongoose.model('Pedido', Pedido)