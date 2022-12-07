import Movimiento from "../models/m_movimiento";
import Producto from "../models/m_producto";
import { BadRequestException } from "../exceptions/BadRequestException";
import { InternalServerException } from "../exceptions/InternalServerException";
import { NotFoundException } from "../exceptions/NotFoundException";
import ERROR_MESSAGE from "../constants/error.enum";
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

    if (!lista_items.length) {
      return res
        .status(ERROR_MESSAGE.NOT_FOUND)
        .json({ message: "No se recibieron los items del movimiento" });
    }

    const productsArray = [];

    // un ITEM (los objects del array lista_items) tiene los campos:
    //     codigo_product, name_product,description,categoria,
    //     stock, precio, cantidad
    if (tipo == "Salida") {
      for (let item of lista_items) {
        // Validación de operacion aceptada con el stock

        if (item.cantidad > item.stock) {
          return res.status(ERROR_MESSAGE.BAD_REQUEST).json({
            message: "NO SE PUEDE REALIZAR OPERACION, STOCK INSUFICIENTE",
          });
        }

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
          return res.status(ERROR_MESSAGE.NOT_FOUND).json({
            message: "No se encontró al producto que se quiere añadir",
          });
        }
        const updated_product = await Producto.findOne({
          codigo: item.codigo_product,
        });

        productsArray.push(updated_product);
      }
    }
    // Para los movimientos de Tipo Entrada
    else {
      for (let item of lista_items) {
        try {
          console.log("old stock", item.stock);
          let stock_new = item.stock + item.cantidad;
          console.log("new stock", stock_new);
          let code_product = item.codigo_product;
          // Actualizar Colleccion Productos
          const Producto_upd = await Producto.findOneAndUpdate(
            { codigo: code_product },
            {
              stock: stock_new,
            }
          );
          if (!Producto_upd) {
            return res.status(ERROR_MESSAGE.NOT_FOUND).json({
              message: "No se encontró al producto que se quiere añadir",
            });
          }
          const updated_product = await Producto.findOne({
            codigo: code_product,
          });

          productsArray.push(updated_product);
        } catch (error) {
          console.log(error);
          return res.status(ERROR_MESSAGE.INTERNAL_SERVER_ERROR).json({
            message: "Ha aparecido un ERROR al momento de crear el movimiento",
          });
        }
      }
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
      movimiento: MovSaved,
      updated_product: productsArray,
      message: "Se ha creado el Movimiento correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(ERROR_MESSAGE.INTERNAL_SERVER_ERROR).json({
      message:
        "Se ha generado un error al momento de crear el movimiento: " + error,
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
    return res.status(500).json({
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
      return res.status(404).json({
        status: 404,
        message: "No se encontró al movimiento que se quiere anular",
      });
    }

    const movementsArray = [];

    //===== record
    if (movimiento_select.lista_items) {
      // un ITEM (los objects del array lista_items) tiene los campos:
      //     codigo_product, name_product,description,categoria,
      //     stock, precio, cantidad
      if (movimiento_select.tipo == "Entrada") {
        for (let item of movimiento_select.lista_items) {
          const item_code = item.codigo_product;
          // Obteniendo Producto del item
          const Producto_item = await Producto.findOne({
            codigo: item_code,
          });
          if (!Producto_item) {
            return res.json({
              status: 404,
              message: "No se encontró el producto del item",
            });
          }
          // Validación de operacion aceptada con el stock
          if (item.cantidad > Producto_item.stock) {
            return res.status(400).json({
              status: 400,
              message: "NO SE PUEDE REALIZAR OPERACION, STOCK INSUFICIENTE",
            });
          }

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
            return res.status(404).json({
              status: 404,
              message: "No se encontró al producto que se quiere actualizar",
            });
          }

          const updated_product = await Producto.findOne({ codigo: item.codigo_product });

          movementsArray.push(updated_product);
        }
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
            return res.status(404).json({
              status: 404,
              message: "No se encontró al producto que se quiere actuañizar",
            });
          }
          const updated_product = await Producto.findOne({
            codigo: item.codigo_product,
          });

          movementsArray.push(updated_product);
        });
      }
    }
    const updated_mov = await Movimiento.findOneAndUpdate(
      { _id },
      { estado: "Anulado" }
    );
    if (!updated_mov) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró al movimiento para anularlo",
      });
    }
    const updated_movimiento = await Movimiento.findOne({ _id });
    return res.status(200).json({
      status: 200,
      message: "Se ha anulado el movimiento",
      data: updated_movimiento,
      movimientos: movementsArray,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Ha aparecido un ERROR al momento de anular el movimiento",
    });
  }
};
