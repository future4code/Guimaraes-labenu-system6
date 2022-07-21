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