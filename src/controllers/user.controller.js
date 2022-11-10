import User from "../models/m_user";
import Role from "../models/m_role";

// Autor: Jonatan Pacora Vega
// 17/10/22
/* el codigo aqui es usado para el
 CUS registrar a un usuario*/
export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles,dni} = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      dni,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
      estado:'habilitado'
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
        status: 200,
      _id: savedUser._id,
      username: savedUser.username,
      dni: savedUser.dni,
      email: savedUser.email,
      roles: savedUser.roles,
      estado: savedUser.estado,
    });
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al Crear el usuario",
      }
      );
    
  }
};
/* el codigo aqui es permite listar
 los usuarios  habilitadas*/
export const getUsers = async (req, res) => {
  try {
     const users = await User.find({estado: "habilitado"});
     return res.json(
       {status: 200,
        message: "Se ha obtenido los usuarios habilitados",
        data: users}
      );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener los usuarios",
      }
      );
  }  
};
// Autor: Jonatan Pacora Vega
// 18/10/22
/* el codigo aqui permite listar
 los usuarios inhabilitados*/
export const getUsersInhabiltados = async (req, res) => {
  try {
     const users = await User.find({estado: "inhabilitado"});
     return res.json(
       {status: 200,
        message: "Se ha obtenido los usuarios inhabilitados",
        data: users}
      );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener los usuarios I",
      }
      );
  }  
};
// Autor: Jonatan Pacora Vega
// 19/10/22
/* el codigo aqui permite Buscar
  a un usuario por su dni*/
export const getUserDni = async (req, res) => {
  try {
  const {dni} = req.params;
  const user = await User.findOne({dni:dni});
  return res.json(
    {status: 200,
    message: "Se ha obtenido el usuario",
    data: user}
    );
  } catch (error) {
    return res.json(
      {status: 500,
      message: "Se ha producido un ERROR al obtener el usuario",
      }
      );
  }
  
  
  
};
/* el codigo aqui permite editar un usuario*/
export const updateUserById= async (req, res) => {
  try {
          const { username, email,dni,passwordNE,roles} = req.body;
          const rolesFound = await Role.find({ name: { $in: roles } });
         
          const { _id } = req.params;
           // Encriptando contraseñ al editar
          const password= await User.encryptPassword(passwordNE);

           const User_upd = await User.findOneAndUpdate(
            { _id },
            {
              username,
              dni,
              email,
              password,
              roles:rolesFound.map((role) => role._id),
              
            } 
          );

          if (!User_upd) {
            return res.json({
              status: 404,
              message: "No se encontró al usuario que se quiere editar",
            });
          }      
          const updated_user = await User.findOne({ _id });      
          return res.json({
            status: 200,
            message: "Se ha actualizado el usuario",
            data: updated_user,
          });
        } catch (error) {
          console.log(error);
          return res.json({
            status: 500,
            message: "Ha aparecido un ERROR al momento de actualizar a un user",
            
          });
        }
       

}
/* el codigo aqui permite dar de baja a un usuario*/
export const updateUserInhabilitar= async (req, res) => {
  try {
                 
          const { _id } = req.params;
           const User_upd = await User.findOneAndUpdate(
            { _id },
            {              
              estado:"inhabilitado"
            } 
          );

          if (!User_upd) {
            return res.json({
              status: 404,
              message: "No se encontró al usuario que se quiere dar de baja",
            });
          }      
          const updated_user = await User.findOne({ _id });      
          return res.json({
            status: 200,
            message: "Se ha inhabilitado el usuario",
            data: updated_user,
          });
        } catch (error) {
          console.log(error);
          return res.json({
            status: 500,
            message: "Ha aparecido un ERROR al momento de dar de baja a un user",            
          });
        }
       

}

/* el codigo aqui permite dar de Alta a un usuario*/
export const updateUserHabilitar= async (req, res) => {
  try {
                 
          const { _id } = req.params;
           const User_upd = await User.findOneAndUpdate(
            { _id },
            {              
              estado:"habilitado"
            } 
          );

          if (!User_upd) {
            return res.json({
              status: 404,
              message: "No se encontró al usuario que se quiere dar de alta",
            });
          }      
          const updated_user = await User.findOne({ _id });      
          return res.json({
            status: 200,
            message: "Se ha Habilitado el usuario",
            data: updated_user,
          });
        } catch (error) {
          console.log(error);
          return res.json({
            status: 500,
            message: "Ha aparecido un ERROR al momento de dar de alta a un user",            
          });
        }
       

}
