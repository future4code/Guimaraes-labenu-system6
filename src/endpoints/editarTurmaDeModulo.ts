import connection from "../data/connection"

export const editarTurmaDeModulo = async (id: number,
    modulo: number) => {
    await connection('LabeSystem_turma')
        .update({
            modulo: modulo
        })
        .where('id', '=', id)
}