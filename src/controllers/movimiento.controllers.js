import Movimiento from '../models/m_movimiento'

// Autor: Anderson Salazar
// 27/10/22
/* el codigo aqui es usado para el
 CUS registrar a un producto*/
 // Autor: Anderson Salazar
// 24/11/22
/* Agregamos el campo stock minimo*/
export const createMovimiento = async (req, res) => {
    try {
        const {
            codigo,
            factura,
            tipo,
            fecha,
            id_responsable,
            name_responsable,
            lista_items,
                       
        } = req.body;        
            
         const newMov= new Movimiento({
                    codigo,
                    factura,
                    tipo,
                    fecha,
                    id_responsable,
                    name_responsable,
                    lista_items  
                })
            
        const MovSaved = await newMov.save()

        return res.json({
            status: 200,
            MovSaved,
            message: "Se ha creado el Movimiento correctamente",
        });        
        
    } catch (error) {
        return res.json({
            status: 500,
            message: "Se ha generado un error al momento de crear el movimiento",
            error
        });
    }

}