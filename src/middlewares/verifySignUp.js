//Validation

import User from "../models/m_user";
import { ROLES } from "../models/m_role";

//Jonatan Pacora Vega
// 17/10/22
// Esta funcion es para verificacion la existencia de un usuario con el mismo username
// O si el correo ya existe en la base de datos
export const checkExistingUser = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ username: req.body.username });
    if (userFound)
      return res.status(400).json({ message: "El usuario ya existe" });

    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "el email ya existe" });
    
    const dni = await User.findOne({ dni: req.body.dni });
      if (dni)
        return res.status(400).json({ message: "Ya existe un usuario con ese DNI" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Para verificacion de la existencia del Rol de usuario
export const checkExistingRole = (req, res, next) => {
  

  if (!req.body.roles) return res.status(400).json({ message: "No roles" });

  
  if (!ROLES.includes(req.body.roles)) {
      return res.status(400).json({
        message: `Role ${req.body.roles} does not exist`,
      });
  }
  
  next();
};