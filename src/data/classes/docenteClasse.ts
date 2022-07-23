import { Usuario } from "./usuario";

export class Docente extends Usuario {
    private especialidades: string;

    constructor(id: string,
        nome: string,
        email: string,
        data_nasc: string,
        turma_id: number,
        especialidades: string) {
        super(id, nome, email, data_nasc, turma_id)
        this.especialidades = especialidades
    }
}