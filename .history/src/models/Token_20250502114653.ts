export default class User {
    id: string;
    tok: string;
    idade: Number; 
    dt_aniversario: Date;
    password: string;

    constructor(nome: string, email: string, idade: Number, dt_aniversario: Date, password: string){
        this.nome = nome,
        this.email =  email,
        this.idade = idade,
        this.dt_aniversario = dt_aniversario,
        this.password = password
    }

  
}
