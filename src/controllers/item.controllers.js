import Item from '../models/m_item_p'
import Producto from '../models/m_producto'
import Movimiento from '../models/m_movimiento'
export const createItem = async (req, res) => {
  try {
    const {
      id_movimiento,
      codigo_product,
      name_product,
      description,
      categoria,
      stock,
      precio,
      cantidad,
      tipo
    } = req.body;

    if (tipo =="Salida") {
      
      // Validación de operacion aceptada con el stock
      if (cantidad <= stock) {
        console.log("old stock",stock)
        const stock_new = stock - cantidad;
        console.log("new stock",stock_new)
        const newItem = new Item({
          id_movimiento,
          codigo_product,
          name_product,
          description,
          categoria,
          stock: stock_new,
          precio,
          cantidad
        })
        const ItemSaved = await newItem.save()
        // Añadiendo el item al mov
        const Mov_upd = await Movimiento.findOneAndUpdate(
          {_id:id_movimiento },
          {
            $push: { 'lista_items': ItemSaved } 
            
          }
        );
        if (!Mov_upd) {
          return res.json({
            status: 404,
            message: "No se encontró al mov que se quiere actualizar",
          });
        }
        const moved = await Movimiento.findOne({_id:id_movimiento });

        // Actualizando en collection: 'Productos'

        const Producto_upd = await Producto.findOneAndUpdate(
          { codigo:codigo_product },
          {
            stock: stock_new
          }
        );
        if (!Producto_upd) {
          return res.json({
            status: 404,
            message: "No se encontró al producto que se quiere actualizar",
          });
        }
        const updated_product = await Producto.findOne({ codigo_product });
        return res.json({
          status: 200,
          ItemSaved,
          updated_product,
          moved,
          message: "Se ha creado el Item correctamente",
        });

      }
      else {
        return res.json({
          status: 400,
          message: "NO SE PUEDE REALIZAR OPERACION, STOCK INSUFICIENTE",
        });
      }
    } else {
      const stock_new = stock + cantidad;
      const newItem = new Item({
        id_movimiento,
        codigo_product,
        name_product,
        description,
        categoria,
        stock:stock_new,
        precio,
        cantidad
      })
      const ItemSaved = await newItem.save()
      // Añadiendo el item al mov
      const Mov_upd = await Movimiento.findOneAndUpdate(
        {_id:id_movimiento },
        {
          $push: { 'lista_items': ItemSaved } 
        }
      );
      if (!Mov_upd) {
        return res.json({
          status: 404,
          message: "No se encontró al mov que se quiere actualizar",
        });
      }
      const moved = await Movimiento.findOne({_id:id_movimiento });
     
      // Actualizando en collection: 'Productos'

      const Producto_upd = await Producto.findOneAndUpdate(
        { codigo:codigo_product },
        {
          stock:stock_new
        }
      );
      if (!Producto_upd) {
        return res.json({
          status: 404,
          message: "No se encontró al producto que se quiere actualizar",
        });
      }
      const updated_product = await Producto.findOne({ codigo:codigo_product });
      return res.json({
        status: 200,
        ItemSaved,
        updated_product,
        moved,
        message: "Se ha creado el Item correctamente",
      });


    }

  } catch (error) {
    return res.json({
      status: 500,
      message: "Se ha generado un error al momento de crear un item",
      error
    });
  }

}

