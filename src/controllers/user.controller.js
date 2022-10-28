import User from "../models/m_user";
import Role from "../models/m_role";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
        status: 200,
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

export const getUser = async (req, res) => {
  const { _id } = req.params;
  const user = await User.findById(_id);
  return res.json(
    {status: 200,
    message: "Se ha obtenido el usuario",
    data: user}
    );
};

//___________________________________
export const updateUserById= async (req, res) => {
  try {
          const { username, email,passwordNE,roles} = req.body;
          const rolesFound = await Role.find({ name: { $in: roles } });
         
          const { _id } = req.params;
           // Encriptando contraseñ al editar
          const password= await User.encryptPassword(passwordNE);

           const User_upd = await User.findOneAndUpdate(
            { _id },
            {
              username,
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

export const deleteUserById= async (req, res) => {
  try {
    const { _id } = req.params;
    await User.findByIdAndDelete(_id);
    return res.json({
      status: 200,
      message: "Se ha eliminado al usuario",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Hubo un error al momento de elimianr un usuario",
    });
  }

}