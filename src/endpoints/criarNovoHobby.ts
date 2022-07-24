import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';
import connection from "../data/connection"

export const criarHobby = async(req: Request,res: Response): Promise<void> => {
    try{

        const hobby = {
            id:generateId(),
            nome: req.body.nome
        }     

        await connection("LabeSystem_hobby").insert(hobby)
        await connection("LabeSystem_hobby").select("*").where("nome", hobby.nome);


        res.send("Novo hobby inserido ao banco de dados")
    }
    catch (e: any) {
        res.send(e.message).status(400)
      }
    }