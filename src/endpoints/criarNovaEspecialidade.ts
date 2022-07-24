import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';
import connection from "../data/connection"

export const criarEspecialidade = async(req: Request,res: Response): Promise<void> => {
    try{

        const especialidade = {
            id:generateId(),
            nome: req.body.nome
        }

        await connection("LabeSystem_especialidade").insert(especialidade)
        await connection("LabeSystem_especialidade").select("*").where("nome", especialidade.nome);

        res.send("Nova especialidade inserida no banco de dados")
    }
    catch (e: any) {
        res.send(e.message).status(400)
      }
    }