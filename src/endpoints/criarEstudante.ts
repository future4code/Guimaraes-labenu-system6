import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';
import connection from "../data/connection"
import { estudanteClass } from "../data/classes/estudanteClass";


export const criarEstudante = async(req: Request,res: Response): Promise<void> => {
    try{
        const id = generateId()
        const { nome, email,data_nasc,turma_id,hobby_id } = req.body
        console.log("Dados do body",req.body);   

        if (!nome || !email || !data_nasc || !turma_id) {
          throw new Error("Algum parâmetro está faltando, verifique o body.")
        }
        
        let idChecagem = await connection("LabeSystem_hobby").select("*").where("id", hobby_id);
        let idTurma = await connection("LabeSystem_turma").select("*").where("id", turma_id);
        
        if (!idTurma[0]){
          throw new Error("O id da turma não é válido")

        }

        if(idChecagem.length >0){
          const novoEstudante:estudanteClass = new estudanteClass(
            id,
            nome,
            email,
            data_nasc,
            turma_id,
            hobby_id
          )

          const novoEstudanteMap = {
            id:novoEstudante.getId(),
            nome:novoEstudante.getNome(),
            email:novoEstudante.getEmail(),
            data_nasc:novoEstudante.getNascimento(),
            turma_id:novoEstudante.getTurmaID()
          }

          let hobby = {
            id: generateId(),
            estudante_id: novoEstudante.getId(),
            hobby_id:novoEstudante.getHobby()
          }
          await connection('LabeSystem_estudante')
          .insert(novoEstudanteMap)

          await connection('LabeSystem_estudante_hobby')
          .insert(hobby)

          res.send(`O (a) estudante ${nome} foi matriculado (a) com sucesso, na turma ${idTurma[0].nome}. ${idChecagem[0].nome} foi adicionado a lista de hobbies.`)
        
        }else if(hobby_id === "0" || hobby_id === ""){

            const novoEstudante:estudanteClass = new estudanteClass(
              id,
              nome,
              email,
              data_nasc,
              turma_id,
              hobby_id
            )
  
            const novoEstudanteMap = {
              id:novoEstudante.getId(),
              nome:novoEstudante.getNome(),
              email:novoEstudante.getEmail(),
              data_nasc:novoEstudante.getNascimento(),
              turma_id:novoEstudante.getTurmaID()
            }  
            
            await connection('LabeSystem_estudante')
            .insert(novoEstudanteMap)
  
            res.send(`estudante ${nome} matriculado com sucesso, entretanto, nenhum hobby foi cadastrado.`)

          }else{
            throw new Error("o ID do hobby nao é valido")
          }
    }
    catch (e: any) {
        res.send(e.message).status(400)
      }
    }

