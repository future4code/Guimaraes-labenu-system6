import connection from "../data/connection"

export const buscarTurmas = async () =>{
    const turmas = await connection('LabeSystem_turma')
    .select()

    return turmas
}