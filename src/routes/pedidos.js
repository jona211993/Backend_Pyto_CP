const express=require('express')
const router=express.Router()

const Pedido=require('../models/Pedido')

router.get('/', async (req, res)=>{
    //res.send('API todo OK')
    try {
        const pedidos = await Pedido.find()
        res.json(pedidos)
    } catch (error) {
        res.send('Error de coneccion BD Mongo - get')
    }
})
router.post('/', async(req, res)=>{
    try {
        const pedido = new Pedido(req.body)
        await pedido.save()
        res.json({
            status:'Pedidos recibidos'
        })
    } catch (error) {
        res.send('Error de coneccion BD Mongo - post')
    }
})
router.put('/:id', async (req, res)=>{
    try {
        await Pedido.findByIdAndUpdate(req.params, req.body)
        res.json({
            status:'Pedido actualizado'
        })
    } catch (error) {
        console.log(req.params)
        res.json('Pedido recibido')
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        await Pedido.findByIdAndRemove(req.params.id);
        res.json({
            status:"Pedido Eliminado"
        })
    } catch (error) {
        res.json('Error no se pudo conectar a la BD')
    }
})

module.exports=router