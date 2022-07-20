import { Turma } from "../classes/Turma"
import connection from "../data/connection"

export const criarTurma = async (id: number,
    turma:Turma) => {
    await connection('LabeSystem_turma')
    .insert({
        id:id,
        nome:turma.nome,
        modulo:turma.modulo
    })
}