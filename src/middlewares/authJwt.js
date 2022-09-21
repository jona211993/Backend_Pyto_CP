//authorizacion
import jwt from "jsonwebtoken";
import config from "../config";

import User from '../models/m_user'
import Role from '../models/m_role'

export const verifyToken= async (req, res,next) => {
    try {
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({message:"No token provided"})
    
        const decoded = jwt.verify(token,config.SECRET)
        req.userId=decoded.id;
    
        const user = await User.findById(req.userId,{password:0})
        if(!user) return res.status(404).json({message: "usuario no encontrado"})
    
        next()
    } catch (error) {
        return res.status(500).json({message: 'No autorizado'})
    }
   
};

export const isJefeAlmacen= async (req, res,next) => {
  const user=await User.findById(req.userId);
  const roles= await Role.find({_id: { $in: user.roles} });

  for (let i=0; i<roles.length; i++){
    if(roles[i].name === "jefe_almacen"){
        next();
        return;
    }
  }
 return res.status(403).json({message:"Requiere Rol Jefe Almacen"});
};

export const isAdmin= async (req, res,next) => {
    const user=await User.findById(req.userId);
    const roles= await Role.find({_id: { $in: user.roles} });
  
    for (let i=0; i<roles.length; i++){
      if(roles[i].name === "admin"){
          next();
          return;
      }
    }
   return res.status(403).json({message:"Requiere Rol Admin"});
  };


export const isJefeVentas= async (req, res,next) => {
    const user=await User.findById(req.userId);
    const roles= await Role.find({_id: { $in: user.roles} });
  
    for (let i=0; i<roles.length; i++){
      if(roles[i].name === "jefe_ventas"){
          next();
          return;
      }
    }
   return res.status(403).json({message:"Requiere Rol Jefe Ventas"});
  };


