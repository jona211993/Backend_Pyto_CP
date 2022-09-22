import Producto from '../models/m_producto'

export const getProductos = async (req, res) => {
    const products = await Producto.find();
    res.json(products)
}
export const getProductoById = async (req, res) => {
    const product = await Producto.findById(req.params);
    res.json(product)
}
export const createProducto = async (req, res) => {
    try {
        const {
            codigo,
            nombre,
            stock,
            costo,
            descripcion,
            precio,
        } = req.body;
        const newProducto = new Producto({
            codigo,
            nombre,
            stock,
            costo,
            descripcion,
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

export const deleteProductById= async (req, res) => {
  try {
    const { _id } = req.params;
    await Producto.findByIdAndDelete(_id);
    return res.json({
      status: 200,
      message: "Se ha eliminado al postulante",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Hubo un error al momento de elimianr un postulante",
    });
  }

}