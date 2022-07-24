import { Request, Response } from "express"
import connection from "../data/connection"
export const buscarEstudante = async(req: Request,res: Response): Promise<void> => {
    try{
        const estudantes = await connection("LabeSystem_estudante").select("*")
        res.status(201).send(estudantes)

    }
    catch{(error:any)=>{
        res.send(error.message)
        }
    }
}