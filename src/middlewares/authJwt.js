//authorizacion
import config from "../config"
import User from '../models/m_user'

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
   
}

export const isJefeAlmacen= async (req, res) => {
    console.log("rr")
}