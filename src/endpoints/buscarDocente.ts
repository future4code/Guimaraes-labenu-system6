import { Request, Response } from "express"
import connection from "../data/connection"
export const buscarDocente = async(req: Request,res: Response): Promise<void> => {
    try{
        const docentes = await connection("LabeSystem_docente").select("*")
        res.status(201).send(docentes)

    }
    catch{(error:any)=>{
        res.send(error.message)
        }
    }
}