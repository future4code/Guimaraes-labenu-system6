import connection from "../data/connection"
import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';

export const adicionarEspecialidadePorId = async(req: Request,res: Response): Promise<void> => {
    try{
        const {docente_id,especialidade_id} = req.body
        
        const especialidade = {
            id:generateId(),
            docente_id: docente_id,
            especialidade_id: especialidade_id
        }

        let addEspecialidade = await connection('LabeSystem_docente_especialidade')
        .insert(especialidade)

        const docenteId = await connection("LabeSystem_docente_especialidade").select("*").where("docente_id",docente_id)
        console.log(docenteId)

        let arrayCovertido = (JSON.parse(JSON.stringify(docenteId)))

        res.send(arrayCovertido)
    }
        catch{(error:any)=>{
            res.send(error.message)
            }
        }
    }