//Validation

import User from "../models/m_user";
import { ROLES } from "../models/m_role";

export const checkExistingUser = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ username: req.body.username });
    if (userFound)
      return res.status(400).json({ message: "El usuario ya existe" });

    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "el email ya existe" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkExistingRole = (req, res, next) => {
  

  if (!req.body.roles) return res.status(400).json({ message: "No roles" });

  
  if (!ROLES.includes(req.body.roles)) {
      return res.status(400).json({
        message: `Role ${req.body.roles} does not exist`,
      });
  }
  
  next();
};