import  User from '../models/m_user'
import jwt from 'jsonwebtoken'
import config  from '../config'
import Role from '../models/m_role'


export const signUp = async (req, res) => {
        
    const {username, email,password,roles}=req.body;
    
    const newUser= new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    // Comprobando si me esta enviando roles:
    if(roles) {
        const foundRoles =await Role.find({name:{$in :roles}})
        newUser.roles= foundRoles.map(role => role._id)
    }else{ 
         // si esta por defecto
        const role = await Role.findOne({name:"user"})
        newUser.roles=[role._id];
    }
    
   const savedUser= await newUser.save();
    

   const token =jwt.sign({id:savedUser._id},config.SECRET,{
        expiresIn:86400 // 24 horas
    })

    res.status(200).json({token})


}

export const signIn = async (req, res) => {
    const userFound= await User.findOne({email: req.body.email}).populate("roles");   

    if(userFound.estado =="inhabilitado") return res.status(403).json({message:"Usuario no encontrado - i"})
    if(!userFound) return res.status(400).json({message:"Usuario no encontrado"})

    const matchPassword= await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Contraseña invalida'})

    
    const roles= await Role.find({_id: { $in: userFound.roles} });
    
    console.log(roles)
    
    let rol="";

    try {
        rol=roles[0].name    
        
    } catch (error) {
        return res.json({
            message:"No se encontro rol"
        })
    }            
    console.log(rol)

    const token= jwt.sign({id: userFound._id, username: userFound.username, rol: rol}, config.SECRET,{
        expiresIn: 86400
    })

    res.json({token})
    
}