import { Request, Response } from "express"
import connection from "../data/connection"
export const buscarEspecialidade = async(req: Request,res: Response): Promise<void> => {
    try{
        const especialidade = await connection("LabeSystem_especialidade").select("*")
        res.status(201).send(especialidade)

    }
    catch{(error:any)=>{
        res.send(error.message)
        }
    }
}