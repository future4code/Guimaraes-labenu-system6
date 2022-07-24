import app from "./app";
import express, { Response, Request } from "express";
import {criarEstudante} from "./endpoints/criarEstudante"
import { criarId } from "./funcoes/criarId";
import { criarTurma } from "./endpoints/criarTurma";
import { buscarTurma } from "./endpoints/buscarTurmas";
import { editarModuloTurma } from "./endpoints/editarTurmaDeModulo";
import { criarDocente } from "./endpoints/criarDocente";
import { buscarDocente } from "./endpoints/buscarDocente";
import { buscarEstudante } from "./endpoints/buscarEstudantes";
import { editarEstudanteTurma } from "./endpoints/editarEstudanteDeTurma";
import { buscarEstudantePeloNome } from "./endpoints/buscarEstudantesPeloNome";
import { editarDocenteTurma } from "./endpoints/editarDocenteDeTurma";
import { buscarDocentePeloNome } from "./endpoints/buscarDocentesPeloNome";
import { criarHobby } from "./endpoints/criarNovoHobby";
import { buscarHobby } from "./endpoints/buscarHobbies";
import { adicionarHobbyPorId } from "./endpoints/adicionarHobbyAoEstudante";
import { adicionarEspecialidadePorId } from "./endpoints/adicionarEspecialidadeAoDocente";
import { criarEspecialidade } from "./endpoints/criarNovaEspecialidade";
import { buscarEspecialidade } from "./endpoints/buscarEspecialidades";

/* ____________________________________ENDPOINTS____________________________________ */

// ADD ESPECIALIDADE AO DOCENTE
app.post('/especialidade/:docente_id', adicionarEspecialidadePorId)

// ADD HOBBY AO ALUNO
app.post('/hobby/:estudante_id', adicionarHobbyPorId)

// CONSULTAR DOCENTES
app.get('/docente', buscarDocente)

// CONSULTAR DOCENTE PELO NOME
app.get('/docente/:nome', buscarDocentePeloNome)

// CONSULTAR ESTUDANTES
app.get('/estudante', buscarEstudante)

// CONSULTAR ESTUDANTES PELO NOME
app.get('/estudante/:nome', buscarEstudantePeloNome)

// CONSULTAR HOBBIES
app.get('/hobby', buscarHobby)

// CONSULTAR ESPECIALIDADES
app.get('/especialidade', buscarEspecialidade)

// CONSULTAR TURMAS ATIVAS
app.get('/turmas', buscarTurma)

// CRIAR TURMA
app.post('/turma', criarTurma)

// CRIAR ESTUDANTE
app.post('/estudante', criarEstudante)

// CRIAR DOCENTE
app.post('/docente', criarDocente)

// CRIAR NOVA ESPECIALIDADE
app.post('/especialidade', criarEspecialidade)

// CRIAR NOVO HOBBY
app.post('/hobby', criarHobby)

// EDITAR TURMA DE MODULO
app.put('/turma/:id', editarModuloTurma)

// EDITAR TURMA DO ESTUDANTE
app.put('/estudante/:id', editarEstudanteTurma)

// EDITAR TURMA DO DOCENTE
app.put('/docente/:id', editarDocenteTurma)