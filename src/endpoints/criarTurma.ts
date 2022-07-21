import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';
import connection from "../data/connection"
import { turmaClass } from "../data/classes/turmaClass"

export const criarTurma = async(req: Request,res: Response): Promise<void> => {
    try{
        const id = generateId()
        const { nome, modulo } = req.body
    
        console.log("Dados do body",req.body);
        
        if (!nome || !modulo) {
          throw new Error("Algum parâmetro está faltando, verifique o body.")
        }
    
        const novaTurma:turmaClass = new turmaClass(
          id,
          nome,
          modulo
        )

        await connection('LabeSystem_turma')
        .insert(novaTurma)
        res.send(`Turma ${nome} cadastrada com sucesso`)
    }
    catch (e: any) {
        res.send(e.message).status(400)
      }
    }