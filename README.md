## LabenuSystem :bookmark_tabs:

##O que é?

Aplicação para gerenciamento de escolas backend desenvolvida em node.js utilizando:

→Cors
→Express
→Knex
→Uuid
→Typescript

###O que faz?

É possivel gerenciar um sistema escolar criando estudantes, docentes e turma. Matricular docentes e estudantes em algum turma, trocar turma de módulo etc... Segue documentação sobre como utilizar a API. A mesma também pode ser encontrado no arquivo *REQUEST.REST*


        → ENDPOINTS DE TURMA

        1 - CONSULTAR TODAS AS TURMAS

        GET  http://localhost:3003/turmas
        Content-Type: application/json
        ###

        2 - CRIAR NOVA TURMA

        POST http://localhost:3003/turma 
        Content-Type: application/json
        //PARA INCIAR UMA TURMA MODULO 0, PASSE APENAS O NOME NO BODY

        {
            "nome":"Montengro",
            "modulo":4
        }
        ###

        3 - EDITAR MODULO TURMA

        PUT http://localhost:3003/turma/1
        Content-Type: application/json

        {
            "modulo":"0"
        }
        ###


        → ENDPOINTS DE ESTUDANTE

        1 - CONSULTAR TODOS OS ESTUDANTES

        GET  http://localhost:3003/estudante
        Content-Type: application/json
        ###

        1.2 - CONSULTAR ESTUDANTE PELO NOME OU PARTE DELE

        GET  http://localhost:3003/estudante/luc
        Content-Type: application/json
        ###

        2 - CRIAR NOVO ESTUDANTE

        POST http://localhost:3003/estudante 
        Content-Type: application/json
        //USE "Hobby_id" 0 PARA NÃO CADASTRAR NENHUM HOBBY

        {
            "nome":"lucaslucas",
            "email":"lucaslucas@gmail.com",
            "data_nasc":"1991-02-26",
            "turma_id":"1",
            "hobby_id":"1"
        }
        ###

        3 - EDITAR TURMA DO ESTUDANTE

        PUT http://localhost:3003/estudante/1
        Content-Type: application/json

        {
            "turma_id":"2"
        }
        ###

        → ENDPOINTS DE DOCENTE

        1 - CONSULTAR TODOS OS DOCENTES

        GET  http://localhost:3003/docente
        Content-Type: application/json
        ###

        1.2 - CONSULTAR DOCENTE PELO NOME OU PARTE DELE

        GET  http://localhost:3003/docente/P
        Content-Type: application/json
        ###

        2 - CRIAR NOVO DOCENTE

        POST http://localhost:3003/docente
        Content-Type: application/json
        //USE "especialidade_id" 0 PARA NÃO CADASTRAR NENHUM HOBBY

        {
            "nome":"pedrinho",
            "email":"pedrinho@gmail.com",
            "data_nasc":"1991-07-28",
            "turma_id":"3",
            "especialidade_id":"5"
        }
        ###

        3 - EDITAR TURMA DO DOCENTE

        PUT http://localhost:3003/docente/3
        Content-Type: application/json

        {
            "turma_id":"5"
        }
        ###

        → ENDPOINTS DE HOBBIES


        1 - CONSULTAR TODOS OS HOBBIES

        GET  http://localhost:3003/hobby
        Content-Type: application/json
        ###


        2 - CRIAR NOVO HOBBY

        POST http://localhost:3003/hobby 
        Content-Type: application/json

        {
            "nome":"descansar"
        }
        ###

        3 - CADASTRAR UM HOBBY PARA ESTUDANTE E RETORNAR A LISTA DE HOBBIES DESSE ESTUDANTE.

        POST http://localhost:3003/hobby/1
        Content-Type: application/json

        {
            "estudante_id":"1",
            "hobby_id":"5"
        }
        ###

        → ENDPOINTS DE ESPECIALIDADE

        1 - CONSULTAR TODAS AS ESPECIALIDADES

        GET  http://localhost:3003/especialidade
        Content-Type: application/json
        ###


        2 - CRIAR NOVA ESPECIALIDADE

        POST http://localhost:3003/especialidade 
        Content-Type: application/json

        {
            "nome":"Angular"
        }
        ###

        3 - CADASTRAR UMA ESPECIALIDADE PARA DOCENTE E RETORNAR A LISTA DE HOBBIES DESSE DOCENTE.

        POST http://localhost:3003/especialidade/1
        Content-Type: application/json

        {
            "docente_id":"1",
            "especialidade_id":"6"
        }
        ###

