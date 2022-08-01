import connection from "./connection";
import turma from "./tables/turma.json"
import estudante from "./tables/estudante.json";
import docente from "./tables/docente.json";
import hobby from "./tables/hobby.json";
import especialidade from "./tables/especialidade.json";
import estudante_hobby from "./tables/estudante_hobby.json";
import docente_especialidade from "./tables/docente_especialidade.json";

const printError = (error: any) => { console.log(error.sqlMessage || error.message) };

const createTables = () => connection
   .raw(`
      CREATE TABLE IF NOT EXISTS LabeSystem_turma(
         id VARCHAR(255) PRIMARY KEY,
         nome VARCHAR(255) NOT NULL,
         modulo INT DEFAULT 0
      );             
      
      CREATE TABLE IF NOT EXISTS LabeSystem_hobby(
         id VARCHAR(255) PRIMARY KEY,
         nome VARCHAR(255) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS LabeSystem_especialidade(
         id VARCHAR(255) PRIMARY KEY,
         nome VARCHAR(255) NOT NULL UNIQUE
      );
      
      CREATE TABLE IF NOT EXISTS LabeSystem_estudante(
         id VARCHAR(255) PRIMARY KEY,
         nome VARCHAR(255) NOT NULL,   
         email VARCHAR(255) DEFAULT 0,
         data_nasc DATE NOT NULL,
         turma_id VARCHAR(255) NOT NULL,
         FOREIGN KEY(turma_id) REFERENCES LabeSystem_turma(id) 
      );

      CREATE TABLE IF NOT EXISTS LabeSystem_docente(
         id VARCHAR(255) PRIMARY KEY,
         nome VARCHAR(255) NOT NULL,   
         email VARCHAR(255) DEFAULT 0,
         data_nasc DATE NOT NULL,
         turma_id VARCHAR(255) NOT NULL,
         FOREIGN KEY(turma_id) REFERENCES LabeSystem_turma(id) 
      );
         
      CREATE TABLE IF NOT EXISTS LabeSystem_estudante_hobby(
         id VARCHAR(255) PRIMARY KEY,
         estudante_id VARCHAR(255) NOT NULL,
         FOREIGN KEY(estudante_id) REFERENCES LabeSystem_estudante(id), 
         hobby_id VARCHAR(255),
         FOREIGN KEY(hobby_id) REFERENCES LabeSystem_hobby(id) 
      );

      CREATE TABLE IF NOT EXISTS LabeSystem_docente_especialidade(
         id VARCHAR(255) PRIMARY KEY,
         docente_id VARCHAR(255) NOT NULL,
         FOREIGN KEY(docente_id) REFERENCES LabeSystem_docente(id),
         especialidade_id VARCHAR(255) DEFAULT 0,
         FOREIGN KEY(especialidade_id) REFERENCES LabeSystem_especialidade(id)
      );

   `)
   .then(() => { console.log("As 7 tabelas foram criadas!") })
   .catch(printError);

const insertTurmas = () => connection("LabeSystem_turma")
   .insert(turma)
   .then(() => { console.log("Tabela turmas foi populada com sucesso!!") })
   .catch(printError);

const insertEstudante = () => connection("LabeSystem_estudante")
   .insert(estudante)
   .then(() => { console.log("Tabela estudante foi populada com sucesso!!") })
   .catch(printError);

const insertHobbyEstudante = () => connection("LabeSystem_estudante_hobby")
   .insert(estudante_hobby)
   .then(() => { console.log("Tabela Hobbies dos estudantes foi populada com sucesso!!") })
   .catch(printError);   

const insertDocente = () => connection("LabeSystem_docente")
   .insert(docente)
   .then(() => { console.log("Tabela de docentes foi populada com sucesso!!") })
   .catch(printError);

const insertHobby = () => connection("LabeSystem_hobby")
   .insert(hobby)
   .then(() => { console.log("Tabela hobbies geral foi populada com sucesso!!") })
   .catch(printError);

const insertEspecialidade = () => connection("LabeSystem_especialidade")
   .insert(especialidade)
   .then(() => { console.log("Tabela especialidades geral foi populada") })
   .catch(printError);

const insertEspecialidadeDocente = () => connection("LabeSystem_docente_especialidade")
   .insert(docente_especialidade)
   .then(() => { console.log("Tabela especialidade dos docentes foi populada com sucesso!!") })
   .catch(printError);

const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertTurmas)
   .then(insertHobby)
   .then(insertEspecialidade)
   .then(insertEstudante)
   .then(insertDocente)
   .then(insertHobbyEstudante)
   .then(insertEspecialidadeDocente)
   .finally(closeConnection);



















/* 
   import { Request, Response } from "express"
import { v4 as generateId } from 'uuid';
import connection from "../data/connection"
import { estudanteClass } from "../data/classes/estudanteClass";


//terminar a logica que checa se a id do hobby existe e pega o hobby daquela id


export const criarEstudante = async(req: Request,res: Response): Promise<void> => {
    try{
        const id = generateId()
        const { nome, email,data_nasc,turma_id,hobby_id } = req.body
        console.log("Dados do body",req.body);   

        if (!nome || !email || !data_nasc || !turma_id) {
          throw new Error("Algum parâmetro está faltando, verifique o body.")
        }
        
        let idChecagem = await connection("LabeSystem_hobby").select("*").where("id", hobby_id);
        console.log("deu god",idChecagem)

        let idTurma = await connection("LabeSystem_turma").select("*").where("id", turma_id);
        console.log("deu god",idTurma)

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
        console.log(novoEstudanteMap)
          let hobby = {
            id: generateId(),
            estudante_id: novoEstudante.getId(),
            hobby_id:novoEstudante.getHobby()
          }
          await connection('LabeSystem_estudante')
          .insert(novoEstudanteMap)

          await connection('LabeSystem_estudante_hobby')
          .insert(hobby)


          res.send(`estudante ${nome} matriculado com sucesso, lista de hobbies atualizada.`)



        }
          if(hobby_id === "0" || hobby_id === ""){

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
          console.log(novoEstudanteMap)
            
            await connection('LabeSystem_estudante')
            .insert(novoEstudanteMap)

  
            res.send(`estudante ${nome} matriculado com sucesso na turma, entretanto, nenhum hobby foi cadastrado.`)

          }


        {
          throw new Error("o ID do hobby nao é valido")
        }


    }
    catch (e: any) {
        res.send(e.message).status(400)
      }
    } */

