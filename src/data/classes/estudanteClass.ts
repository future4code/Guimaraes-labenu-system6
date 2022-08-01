export class estudanteClass {    
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private data_nasc: Date,
        private turma_id: string,
        private hobby_id?:string
    
    ) {
        this.id = id
        this.nome = nome
        this.email = email
        this.data_nasc = data_nasc
        this.turma_id = turma_id
        this.hobby_id = hobby_id


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
    
    public getHobby (): any {
        return this.hobby_id
      }

    public setHobby(hobby: any) {
    this.hobby_id = hobby;
    }
  }