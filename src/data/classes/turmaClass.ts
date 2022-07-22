export class turmaClass {
    constructor(
        private id: string,
        private nome: string,
        private modulo: number
    ) {
      this.id = id
      this.nome = nome
      this.modulo = modulo
    }
  
    public getId(): string {
      return this.id
    }
  
    public getnome(): string {
      return this.nome
    }
  
    public getmodulo(): number {
      return this.modulo
    }
  }