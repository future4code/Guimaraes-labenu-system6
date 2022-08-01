import { Request, Response } from "express"
import connection from "../data/connection"
export const buscarTurma = async(req: Request,res: Response): Promise<void> => {
    try{
        const turma = await connection("LabeSystem_turma").select("*")
        res.status(201).send(turma)

    }
    catch{(error:any)=>{
        res.send(error.message)
        }
    }
}