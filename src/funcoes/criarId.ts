import connection from "../data/connection"

export const criarId = async (tabela:string) => {
    const idData = await connection(tabela)
    .select('id')

    const ids = idData.map(obj =>{
        return obj.id
    })

    const newId = Number(Math.max(...ids))+1

    return newId
}