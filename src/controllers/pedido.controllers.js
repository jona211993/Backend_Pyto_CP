import Pedido from '../models/m_pedido'

export const getPedidos = async (req, res) => {
    const pedidos = await Pedido.find();
    res.json(pedidos)
}
export const getPedidoById = async (req, res) => {
    const pedido = await Pedido.findById(req.params);
    res.json(pedido)
}
export const createPedido = async (req, res) => {
    try {
        const {
            codigo,
            nombre,
            stock,
            costo,
            descripcion,
            precio,
        } = req.body;
        const newPedido = new Pedido({
            codigo,
            nombre,
            stock,
            costo,
            descripcion,
            precio,
        })
        const pedidoSaved = await newPedido.save()

        return res.json({
            status: 201,
            pedidoSaved,
            message: "Se ha creado el nuevo pedido",
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Se ha generado un error al momento de crear un pedido",
        });
    }

}

export const updatePedidoById= async (req, res) => {
    try {
            const {
              codigo,
              nombre,
              stock,
              costo,
              descripcion,
              precio,
              
            } = req.body;
        
            const { _id } = req.params;
        
            const Pedido_upd = await Pedido.findOneAndUpdate(
              { _id },
              {
                 codigo,
              nombre,
              stock,
              costo,
              descripcion,
              precio,
              }
            );
            if (!Pedido_upd) {
              return res.json({
                status: 404,
                message: "No se encontró al pedido que se quiere editar",
              });
            }
        
            const updated_pedido = await Pedido.findOne({ _id });
        
            return res.json({
              status: 200,
              message: "Se ha actualizado el pedido",
              data: updated_pedido,
            });
          } catch (error) {
            console.log(error);
            return res.json({
              status: 500,
              message: "Ha aparecido un ERROR al momento de actualizar a un pedido",
              
            });
          }
         

}

export const deletePedidoById= async (req, res) => {
  try {
    const { _id } = req.params;
    await Pedido.findByIdAndDelete(_id);
    return res.json({
      status: 200,
      message: "Se ha eliminado el pedido",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Hubo un error al momento de eliminar el pedido",
    });
  }

}