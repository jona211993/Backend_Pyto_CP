import Categoria from '../models/m_categoria'

// Autor: Jonatan Pacora Vega
// 02/11/22
/* el codigo aqui es permite listar
 las categorias habilitadas*/
export const getCategorias = async (req, res) => {
  try{
    const categorias = await Categoria.find({estado:"habilitado"});
    return res.json(
      {status: 200,
       message: "Se ha obtenido las categorias habilitadas",
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
/* el codigo aqui  permite listar
 las categorias inhabilitadas*/
export const getCategoriasInhabilitadas = async (req, res) => {
  try{
    const categorias = await Categoria.find({estado:"inhabilitado"});
    return res.json(
      {status: 200,
       message: "Se ha obtenido las categorias inhabilitadas",
       data: categorias}
     );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener las categorias I",
      }
      );
  }
}
// Autor: Jonatan Pacora Vega
// 03/11/22
/* el codigo aqui es usado para el
 CUS de buscar una categorias por su codigo*/
export const getCategoriaByCode = async (req, res) => {
  try{
    const {codigo} = req.params;
    let categoria = await Categoria.findOne({codigo:codigo});
    return res.json(
      {status: 200,
       message: "Se ha obtenido las categorias por codigo",
       data: categoria}
     );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener la categoria por codigo",
      }
      );
  }
}
/* el codigo aqui es usado para el
 poder mostrar las categorias  en el checkbox*/
export const getCategoriaByName = async (req, res) => {
  try{
    var name=req.params._name
    let categoria= await Categoria.find({ nombre: name });
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
// Autor: Jonatan Pacora Vega
// 01/11/22
/* el codigo aqui es usado para el
 CUS registrar a una categorias*/
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
        estado:"habilitado"
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
// Autor: Jonatan Pacora Vega
// 04/11/22
/* el codigo aqui es usado para modificar el ESTADO DE LA CATEGORIA
no se modifica otro campo*/
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
// export const deleteCategoriaById= async (req, res) => {
//   try {
//     const { _id } = req.params;
//     await Categoria.findByIdAndDelete(_id);
//     return res.json({
//       status: 200,
//       message: "Se ha eliminado la categoría",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       status: 500,
//       message: "Hubo un error al momento de eliminar la categoría",
//     });
//   }

// }