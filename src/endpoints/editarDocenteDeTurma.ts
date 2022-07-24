import { Request, Response } from "express"
import connection from "../data/connection"

const updateDocente = async (id: string,turma_id: string): Promise<any> => {
    await connection("LabeSystem_docente")
       .update({
         turma_id: turma_id
       })
       .where("id", id);
 };

export const editarDocenteTurma = async(req: Request,res: Response): Promise<void> => {
    try{
        const docenteID = req.params.id
        let novaTurmaId = req.body.turma_id
        let docentes2 =  await updateDocente(docenteID, novaTurmaId);
        
        let docentes = await connection("LabeSystem_docente").select("*").where("id","like",`${docenteID}`)
        let arrayCovertido = (JSON.parse(JSON.stringify(docentes)))
        
        res.status(201).send(arrayCovertido)
    }
        catch{(error:any)=>{
            res.send(error.message)
            }
        }
    }