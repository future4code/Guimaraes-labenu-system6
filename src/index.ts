import app from "./app";
import express, { Response, Request } from "express";
import { criarId } from "./funcoes/criarId";
import { Turma } from "./classes/Turma";
import { criarTurma } from "./endpoints/criarTurma";

// TESTAR CONEXÃO
app.get('/ping', (req: Request, res: Response) => {
    try {
        res.status(200).send("Pong")
    } catch (err) {
        res.status(500).end("Deu algo de errado")
    }
})

// BUSCAR TURMAS ATIVAS
app.get('/turmas', async (req: Request, res: Response)=>{
    let errorCode = 500
    try {
        
    } catch (err:any) {
        res.status(errorCode).end(err.message)
    }
})

// CRIAR TURMA
app.post('/turma', async (req: Request, res: Response) => {
    let errorCode = 500
    try {
        const id = await criarId('LabeSystem_turma')

        const { nome, modulo } = req.body

        if(!nome || !modulo){
            errorCode = 400
            throw new Error("Parâmetros não podem estar vazios.")
        }

        const novaTurma = new Turma(nome,modulo)

        await criarTurma(id, novaTurma)

        res.status(200).send(`Turma ${novaTurma.nome} criada com sucesso!`)
    } catch (err: any) {
        res.status(errorCode).end(err.message)
    }
})
