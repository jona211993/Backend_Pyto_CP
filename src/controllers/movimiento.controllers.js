import Movimiento from "../models/m_movimiento";
import Producto from "../models/m_producto";
// Autor: Jonatan Pacora
// 30/11/22
/* el codigo aqui es usado para el
 CUS 22 - 23 registrar a un movimiento*/

export const createMovimiento = async (req, res) => {
  try {
    const {
      codigo,
      factura,
      tipo,
      fecha,
      id_responsable,
      name_responsable,
      lista_items,
    } = req.body;

    if (lista_items) {
      // un ITEM (los objects del array lista_items) tiene los campos:
      //     codigo_product, name_product,description,categoria,
      //     stock, precio, cantidad
      if (tipo == "Salida") {
        lista_items.forEach(async (item) => {
          // Validación de operacion aceptada con el stock
          if (item.cantidad <= item.stock) {
            console.log("old stock", item.stock);
            const stock_new = item.stock - item.cantidad;
            console.log("new stock", stock_new);
            // Actualizar Colleccion Productos
            const Producto_upd = await Producto.findOneAndUpdate(
              { codigo: item.codigo_product },
              {
                stock: stock_new,
              }
            );
            if (!Producto_upd) {
              return res.json({
                status: 404,
                message: "No se encontró al producto que se quiere añadir",
              });
            }
            const updated_product = await Producto.findOne({
              codigo: codigo_product,
            });
            return res.json({
              status: 200,
              updated_product,
              message: "Se ha creado el Item correctamente",
            });
          } else {
            return res.json({
              status: 400,
              message: "NO SE PUEDE REALIZAR OPERACION, STOCK INSUFICIENTE",
            });
          }
        });
      }
      // Para los movimientos de Tipo Entrada
      else {
        
          await lista_items.forEach(async (item) => {
            try {
            console.log("old stock", item.stock);
            let stock_new = item.stock + item.cantidad;
            console.log("new stock", stock_new);
            let code_product=item.codigo_product
            // Actualizar Colleccion Productos
            const Producto_upd = await Producto.findOneAndUpdate(
              { codigo: code_product },
              {
                stock: stock_new,
              }
            );
            if (!Producto_upd) {
              return res.json({
                status: 404,
                message: "No se encontró al producto que se quiere añadir",
              });
            }
            const updated_product = await Producto.findOne({
              codigo: code_product,
            });
            return res.json({
              status: 200,
              updated_product,
              message: "Se ha creado el Item correctamente",
            });
          } catch (error) {
            console.log(error);
            return res.json({
              status: 500,
              message: "Ha aparecido un ERROR al momento de crear el movimiento",
            });
          }



          });
          
        
        
      }

      const newMov = new Movimiento({
        codigo,
        factura,
        tipo: tipo,
        fecha,
        id_responsable,
        name_responsable,
        lista_items: lista_items,
        estado: "Aprobado",
      });
      const MovSaved = await newMov.save();

      return res.json({
        status: 200,
        MovSaved,
        message: "Se ha creado el Movimiento correctamente",
      });
    } else {
      return res.json({
        status: 404,
        message: "No se recibieron los items del movimiento",
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "Se ha generado un error al momento de crear el movimiento",
      error,
    });
  }
};
// Autor: Jonatan Pacora
// 6/12/22
/* Esta parte del codigo permite buscar un movimiento por su code*/
export const getMovimientoByCode = async (req, res) => {
  try {
    const { codigo } = req.params;
    let movimiento = await Movimiento.findOne({ codigo: codigo });
    if (!movimiento) {
      return res.json({
        status: 404,
        message: "No se encontró al Movimiento",
      });
    }
    return res.json({
      status: 200,
      message: "Se ha obtenido el movimiento por codigo",
      data: movimiento,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Se ha producido un ERROR al obtener un movimiento por codigo",
    });
  }
};
// Autor: Jonatan Pacora
// 6/12/22
/* Esta parte del codigo permite Anular un movimiento
 actualizando el stock en Productos*/
export const updateAnular = async (req, res) => {
  try {
    const { _id } = req.params;

    const movimiento_select = await Movimiento.findById({ _id });

    if (!movimiento_select) {
      return res.json({
        status: 404,
        message: "No se encontró al movimiento que se quiere anular",
      });
    }
    //===== record
    if (movimiento_select.lista_items) {
      // un ITEM (los objects del array lista_items) tiene los campos:
      //     codigo_product, name_product,description,categoria,
      //     stock, precio, cantidad
      if (movimiento_select.tipo == "Entrada") {
         await movimiento_select.lista_items.forEach(async (item) => {
          const item_code = item.codigo_product;
          // Obteniendo Producto del item
          const Producto_item = await Producto.findOne({
            codigo: item_code});
          if (!Producto_item) {
            return res.json({
              status: 404,
              message: "No se encontró el producto del item",
            });
          }
          // Validación de operacion aceptada con el stock
          if (item.cantidad <= Producto_item.stock) {
            console.log("old stock", Producto_item.stock);
            const stock_new = Producto_item.stock - item.cantidad;
            console.log("new stock", stock_new);
            // Actualizar Colleccion Productos
            const Producto_upd = await Producto.findOneAndUpdate(
              { codigo: item.codigo_product },
              {
                stock: stock_new,
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
              updated_product,
              message: "Se ha anulado la entrada del Item correctamente",
            });
          } else {
            return res.json({
              status: 400,
              message: "NO SE PUEDE REALIZAR OPERACION, STOCK INSUFICIENTE",
            });
          }
        });
      }
      // Para los movimientos de Tipo Salida
      else {
        const lista_items = movimiento_select.lista_items;
        await lista_items.forEach(async (item) => {
          const item_code = item.codigo_product;
          // Obteniendo el stock producto del item
          const Producto_item = await Producto.findOne({
            codigo: item_code,
          });
          if (!Producto_item) {
            return res.json({
              status: 404,
              message: "No se encontró el producto del item",
            });
          }
          console.log("old stock", Producto_item.stock);
          const stock_new = Producto_item.stock + item.cantidad;
          console.log("new stock", stock_new);
          // Actualizar Colleccion Productos
          const Producto_upd = await Producto.findOneAndUpdate(
            { codigo: item.codigo_product },
            {
              stock: stock_new,
            }
          );
          if (!Producto_upd) {
            return res.json({
              status: 404,
              message: "No se encontró al producto que se quiere actuañizar",
            });
          }
          const updated_product = await Producto.findOne({
            codigo: item.codigo_product,
          });

          return res.json({
            status: 200,
            updated_product,
            message: "Se ha anulo el Item correctamente",
          });
        });
      }
    }
    const updated_mov = await Movimiento.findOneAndUpdate(
      { _id },
      { estado: "Anulado" }
    );
    if (!updated_mov) {
      return res.json({
        status: 404,
        message: "No se encontró al movimiento para anularlo",
      });
    }
    const updated_movimiento = await Movimiento.findOne({ _id });
    return res.json({
      status: 200,
      message: "Se ha anulado el movimiento",
      data: updated_movimiento,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Ha aparecido un ERROR al momento de anular el movimiento",
    });
  }
};
