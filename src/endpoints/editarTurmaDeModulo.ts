import connection from "../data/connection"
import { Request, Response } from "express"


const updateModulo = async (id: string,
    modulo: number) => {
    await connection('LabeSystem_turma')
        .update({
            modulo: modulo
        })
        .where('id', '=', id)
}

export const editarModuloTurma = async(req: Request,res: Response): Promise<void> => {
    try{
        const turmaID = req.params.id
        let novoModuloId = req.body.modulo
        let update =  await updateModulo(turmaID, novoModuloId);
        
        let turmaAtualizada = await connection("LabeSystem_turma").select("*").where("id","like",`${turmaID}`)
        let arrayCovertido = (JSON.parse(JSON.stringify(turmaAtualizada)))
        
        res.status(201).send(arrayCovertido)
    }
        catch{(error:any)=>{
            res.send(error.message)
            }
        }
    }