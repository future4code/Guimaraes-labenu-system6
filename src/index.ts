import app from "./app";
import express, { Response, Request } from "express";
import { criarId } from "./funcoes/criarId";
import { Turma } from "./classes/Turma";
import { criarTurma } from "./endpoints/criarTurma";
import { buscarTurmas } from "./endpoints/buscarTurmas";
import { editarTurmaDeModulo } from "./endpoints/editarTurmaDeModulo";

// TESTAR CONEXÃO
app.get('/ping', (req: Request, res: Response) => {
    try {
        res.status(200).send("Pong")
    } catch (err) {
        res.status(500).end("Deu algo de errado")
    }
})

// BUSCAR TURMAS ATIVAS
app.get('/turmas', async (req: Request, res: Response) => {
    let errorCode = 500
    try {
        const turmas = await buscarTurmas()

        res.status(200).send(turmas)
    } catch (err: any) {
        res.status(errorCode).end(err.message)
    }
})

// CRIAR TURMA
app.post('/turma', criarTurma)

// EDITAR TURMA DE MODULO
app.put('/turma/:id', async (req: Request, res: Response) => {
    let errorCode = 500
    try {
        const id = Number(req.params.id)
        const novoModulo = req.body.modulo

        if (!novoModulo) {
            errorCode = 400
            throw new Error("Parâmetro body não enviado.")
        }

        await editarTurmaDeModulo(id, novoModulo)

        res.status(200).send(`Modulo da turma de id: ${id} alterado para ${novoModulo}.`)
    } catch (err: any) {
        res.status(errorCode).end(err.message)
    }
})
