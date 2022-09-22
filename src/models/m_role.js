import { Schema, model } from "mongoose";

export const ROLES = ["user", "admin", "jefe_almacen","jefe_ventas"];

const roleSchema = new Schema({
    name: String},
    {versionKey:false
    })

export default model("Role",roleSchema)
 
