export class docenteClass {    
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private data_nasc: Date,
        private turma_id: string,
        private especialidade_id?:string
    
    ) {
        this.id = id
        this.nome = nome
        this.email = email
        this.data_nasc = data_nasc
        this.turma_id = turma_id
        this.especialidade_id = especialidade_id


    }
    public getId(): string {
        return this.id
      }

    public getNome(): string {
      return this.nome
    }

    public getEmail(): string {
        return this.email
      }

    public getNascimento(): Date {
        return this.data_nasc
      }

    public getTurmaID(): string {
        return this.turma_id
      }
    
    public getEspecialidade (): any {
        return this.especialidade_id
      }

    public setEspecialidade(hobby: any) {
    this.especialidade_id = hobby;
    }
  }