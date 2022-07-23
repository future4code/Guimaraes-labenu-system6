import { Usuario } from "./usuario";

export class Estudante extends Usuario {
    private hobbies: string;

    constructor(id: number,
        nome: string,
        email: string,
        data_nasc: string,
        turma_id: number,
        hobbies: string) {
        super(id, nome, email, data_nasc, turma_id)
        this.hobbies = hobbies
    }
}