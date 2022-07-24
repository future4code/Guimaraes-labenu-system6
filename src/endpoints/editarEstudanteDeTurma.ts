import { Request, Response } from "express"
import connection from "../data/connection"


const updateEstudantes = async (id: string,turma_id: string): Promise<any> => {
    await connection("LabeSystem_estudante")
       .update({
         turma_id: turma_id
       })
       .where("id", id);
 };


export const editarEstudanteTurma = async(req: Request,res: Response): Promise<void> => {
    try{
        const estudanteID = req.params.id
        let novaTurmaId = req.body.turma_id
        let estudantes2 =  await updateEstudantes(estudanteID, novaTurmaId);
        
        let estudantes = await connection("LabeSystem_estudante").select("*").where("id","like",`${estudanteID}`)
        let arrayCovertido = (JSON.parse(JSON.stringify(estudantes)))
        
        res.status(201).send(arrayCovertido)
    }
        catch{(error:any)=>{
            res.send(error.message)
            }
        }
    }