import Movimiento from "../models/m_movimiento";
import Producto from "../models/m_producto";
// Autor: Anderson Salazar
// 27/10/22
/* el codigo aqui es usado para el
 CUS registrar a un producto*/
// Autor: Anderson Salazar
// 24/11/22
/* Agregamos el campo stock minimo*/
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
      //     stock, precio, cantidad, tipo
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
            const updated_product = await Producto.findOne({ codigo_product });
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
        lista_items.forEach(async (item) => {
          console.log("old stock", item.stock);
          const stock_new = item.stock + item.cantidad;
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
          const updated_product = await Producto.findOne({ codigo_product });
          return res.json({
            status: 200,
            updated_product,
            message: "Se ha creado el Item correctamente",
          });
        });
      }

      const newMov = new Movimiento({
        codigo,
        factura,
        tipo:tipo,
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