import { Request, Response } from "express"
import connection from "../data/connection"

export const buscarDocentePeloNome = async(req: Request,res: Response): Promise<void> => {
    try{
        let nome = req.params.nome
        let docentes = await connection("LabeSystem_docente").select("*").where("nome","like",`%${nome}%`)
        let arrayCovertido = (JSON.parse(JSON.stringify(docentes)))
        console.log(nome)
        
        
        res.status(201).send(arrayCovertido)

    }
    catch{(error:any)=>{
        res.send(error.message)
        }
    }
}