import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';
import connection from "../data/connection"
import { Estudante } from "../data/classes/estudanteClass"

export const criarEstudante = async(req: Request,res: Response): Promise<void> => {
    try {
        const id = generateId()
        const { nome, email, data_nasc, turma_id, hobbies } = req.body

        const novoEstudante: Estudante = new Estudante(id,
            nome,
            email,
            data_nasc,
            turma_id,
            hobbies)

        console.log(novoEstudante)
    } catch (e: any) {
        res.send(e.message).status(400)
    }
}