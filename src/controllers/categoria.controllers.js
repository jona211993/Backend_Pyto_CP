import Categoria from '../models/m_categoria'

export const getCategorias = async (req, res) => {
  try{
    const categorias = await Categoria.find();
    return res.json(
      {status: 200,
       message: "Se ha obtenido las categorias",
       data: categorias}
     );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener las categorias",
      }
      );
  }
}
export const getCategoriaById = async (req, res) => {
  try{
    const categoria = await Categoria.findById(req.params);
    return res.json(
      {status: 200,
       message: "Se ha obtenido las categorias por id",
       data: categoria}
     );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener la categoria por id",
      }
      );
  }
}
export const getCategoriaByName = async (req, res) => {
  try{
    var name=req.params._name
    const categoria= await Categoria.find({ nombre: name });
    return res.json(
      {status: 200,
       message: "Se ha obtenido las categorias por nombre",
       data: categoria}
     );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener la categoria por nombre",
      }
      );
  }
}
export const createCategoria = async (req, res) => {
  try {
      const {
        codigo,
        nombre,
        estado
      } = req.body;
      const newCategoria = new Categoria({
        codigo,
        nombre,
        estado
      })
      const categoriaSaved = await newCategoria.save()

      return res.json({
          status: 201,
          categoriaSaved,
          message: "Se ha creado la nueva categoria",
      });
  } catch (error) {
      return res.json({
          status: 500,
          message: "Se ha generado un error al momento de crear una categoria",
      });
  }
}
export const updateCategoriaById= async (req, res) => {
  try {
    const {
      codigo,
      nombre,
      estado
    } = req.body;
    const { _id } = req.params;
    const Categoria_upd = await Categoria.findOneAndUpdate(
      { _id },
      {
        codigo,
        nombre,
        estado
      });
    if (!Categoria_upd) {
      return res.json({
        status: 404,
          message: "No se encontró la categoría que se quiere editar",
        });
      }
    const updated_categoria = await Categoria.findOne({ _id });
    return res.json({
      status: 200,
      message: "Se ha actualizado el pedido",
      data: updated_categoria,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Ha aparecido un ERROR al momento de actualizar la categoría",
    });
  }
}
export const deleteCategoriaById= async (req, res) => {
  try {
    const { _id } = req.params;
    await Categoria.findByIdAndDelete(_id);
    return res.json({
      status: 200,
      message: "Se ha eliminado la categoría",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Hubo un error al momento de eliminar la categoría",
    });
  }

}