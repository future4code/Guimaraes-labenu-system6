import { Request, Response } from "express"
import connection from "../data/connection"

export const buscarEstudantePeloNome = async(req: Request,res: Response): Promise<void> => {
    try{
        let nome = req.params.nome
        let estudantes = await connection("LabeSystem_estudante").select("*").where("nome","like",`%${nome}%`)
        let arrayCovertido = (JSON.parse(JSON.stringify(estudantes)))
        
        res.status(201).send(arrayCovertido)

    }
    catch{(error:any)=>{
        res.send(error.message)
        }
    }
}