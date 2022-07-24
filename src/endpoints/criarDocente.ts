import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';
import connection from "../data/connection"
import {docenteClass} from "../data/classes/docenteClass"
export const criarDocente = async(req: Request,res: Response): Promise<void> => {
    try{
        const id = generateId()
        const { nome, email,data_nasc,turma_id,especialidade_id } = req.body
        console.log("Dados do body",req.body);   

        if (!nome || !email || !data_nasc || !turma_id) {
          throw new Error("Algum parâmetro está faltando, verifique o body.")
        }
        
        let idChecagem = await connection("LabeSystem_especialidade").select("*").where("id", especialidade_id);
        let idTurma = await connection("LabeSystem_turma").select("*").where("id", turma_id);
        
        if (!idTurma[0]){
          throw new Error("O id da turma não é válido")

        }

        if(idChecagem.length >0){
          const novodocente:docenteClass = new docenteClass(
            id,
            nome,
            email,
            data_nasc,
            turma_id,
            especialidade_id
          )

          const novoDocenteMap = {
            id:novodocente.getId(),
            nome:novodocente.getNome(),
            email:novodocente.getEmail(),
            data_nasc:novodocente.getNascimento(),
            turma_id:novodocente.getTurmaID()
          }
        console.log(novoDocenteMap)
          let novaEspecialidade = {
            id: generateId(),
            docente_id: novodocente.getId(),
            especialidade_id:novodocente.getEspecialidade()
          }
          await connection('LabeSystem_docente')
          .insert(novoDocenteMap)

          await connection('LabeSystem_docente_especialidade')
          .insert(novaEspecialidade)


          res.send(`O (a) docente ${nome} foi matriculado (a) com sucesso, na turma ${idTurma[0].nome}. ${idChecagem[0].nome} foi adicionado a lista de especialidade do docente.`)


        }
          else if(especialidade_id === "0" || especialidade_id === ""){

            const novodocente:docenteClass = new docenteClass(
              id,
              nome,
              email,
              data_nasc,
              turma_id,
              especialidade_id
            )
  
            const novoDocenteMap = {
              id:novodocente.getId(),
              nome:novodocente.getNome(),
              email:novodocente.getEmail(),
              data_nasc:novodocente.getNascimento(),
              turma_id:novodocente.getTurmaID()
            } 
            
            await connection('LabeSystem_docente')
            .insert(novoDocenteMap)

  
            res.send(`docente ${nome} matriculado com sucesso, entretanto, nenhuma especialidade foi cadastrada.`)

          }else{
            throw new Error("o ID da especialidade nao é valida")
          }

    }
    catch (e: any) {
        res.send(e.message).status(400)
      }
    }

