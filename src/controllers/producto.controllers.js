import Producto from '../models/m_producto'

// Autor: Anderson Salazar
// 27/10/22
/* el codigo aqui es usado para obtenera a los productos habilitados*/

export const getProductos = async (req, res) => {
    try{
      const products = await Producto.find({estado:"habilitado"});
      return res.json(
        {status: 200,
         message: "Se ha obtenido los productos habilitados",
         data: products}
       );
    } catch (error) {
      return res.json(
        {status: 500,
        message: "Se ha producido un ERROR al obtener los productos",
        }
        );
    }
}
/* el codigo aqui es usado para obtenera a los productos inhabilitados*/
export const getProductosInhabilitados = async (req, res) => {
  try{
    const productos = await Producto.find({estado:"inhabilitado"});
    return res.json(
      {status: 200,
       message: "Se ha obtenido los productos inhabilitados",
       data: productos}
     );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener las productos inhabilitados",
      }
      );
  }
}
/* el codigo aqui es usado para obtener un producto por su codigo*/
export const getProductoByCode = async (req, res) => {
  try{
    const {codigo} = req.params;
    let productos = await Producto.findOne({codigo:codigo});
    return res.json(
      {status: 200,
       message: "Se ha obtenido las productos por codigo",
       data: productos}
     );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener los productos por codigo",
      }
      );
  }
}
/* el codigo aqui es usado para obtener un producto por su id*/
export const getProductoById = async (req, res) => {
    const product = await Producto.findById(req.params);
    res.json(product)
}

// Autor: Anderson Salazar
// 27/10/22
/* el codigo aqui es usado para el
 CUS registrar a un producto*/
export const createProducto = async (req, res) => {
    try {
        const {
            codigo,
            nombre,
            stock,
            costo,
            nomCategoria,
            descripcion,
            precio,
        } = req.body;
        const newProducto = new Producto({
            codigo,
            nombre,
            stock,
            costo,
            nomCategoria,
            descripcion,
            estado:"habilitado",
            precio,
        })
        const productoSaved = await newProducto.save()

        return res.json({
            status: 201,
            productoSaved,
            message: "Se ha creado el nuevo producto",
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Se ha generado un error al momento de crear un producto",
        });
    }

}

export const updateProductById= async (req, res) => {
    try {
            const {
              codigo,
              nombre,
              stock,
              costo,
              nomCategoria,
              descripcion,
              precio,
              
            } = req.body;
        
            const { _id } = req.params;
        
            const Producto_upd = await Producto.findOneAndUpdate(
              { _id },
              {
              codigo,
              nombre,
              stock,
              costo,
              nomCategoria,
              descripcion,
              precio,
              }
            );
            if (!Producto_upd) {
              return res.json({
                status: 404,
                message: "No se encontró al producto que se quiere editar",
              });
            }
        
            const updated_product = await Producto.findOne({ _id });
        
            return res.json({
              status: 200,
              message: "Se ha actualizado el producto",
              data: updated_product,
            });
          } catch (error) {
            console.log(error);
            return res.json({
              status: 500,
              message: "Ha aparecido un ERROR al momento de actualizar a un producto",
              
            });
          }
         

}

/* el codigo aqui permite dar de baja a un producto*/
export const updateProductInhabilitar= async (req, res) => {
  try {
                 
          const { _id } = req.params;
           const Product_upd = await Producto.findOneAndUpdate(
            { _id },
            {              
              estado:"inhabilitado"
            } 
          );

          if (!Product_upd) {
            return res.json({
              status: 404,
              message: "No se encontró al producto que se quiere dar de baja",
            });
          }      
          const updated_product = await Producto.findOne({ _id });      
          return res.json({
            status: 200,
            message: "Se ha inhabilitado el producto",
            data: updated_product,
          });
        } catch (error) {
          console.log(error);
          return res.json({
            status: 500,
            message: "Ha aparecido un ERROR al momento de dar de baja a un producto",            
          });
        }
       

}

/* el codigo aqui permite dar de Alta a un Producto*/
export const updateProductHabilitar= async (req, res) => {
  try {
                 
          const { _id } = req.params;
           const Product_upd = await Producto.findOneAndUpdate(
            { _id },
            {              
              estado:"habilitado"
            } 
          );

          if (!Product_upd) {
            return res.json({
              status: 404,
              message: "No se encontró al producto que se quiere dar de alta",
            });
          }      
          const updated_product = await Producto.findOne({ _id });      
          return res.json({
            status: 200,
            message: "Se ha Habilitado el producto",
            data: updated_product,
          });
        } catch (error) {
          console.log(error);
          return res.json({
            status: 500,
            message: "Ha aparecido un ERROR al momento de dar de alta a un producto",            
          });
        }
       

}
