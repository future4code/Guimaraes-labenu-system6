import connection from "../data/connection"
import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';

export const adicionarHobbyPorId = async(req: Request,res: Response): Promise<void> => {
    try{
        const {estudante_id,hobby_id} = req.body
        
        const hobby = {
            id:generateId(),
            estudante_id: estudante_id,
            hobby_id: hobby_id
        }

        let addHobby = await connection('LabeSystem_estudante_hobby')
        .insert(hobby)

        const estudanteId = await connection("LabeSystem_estudante_hobby").select("*").where("estudante_id",estudante_id)
        console.log(estudanteId)

        let arrayCovertido = (JSON.parse(JSON.stringify(estudanteId)))

        res.send(arrayCovertido)
    }
        catch{(error:any)=>{
            res.send(error.message)
            }
        }
    }