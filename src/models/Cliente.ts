import User from './User'

export default class Cliente {
    user: User;
    peso: Number;
    altura: Number;
    convenio: string;

    constructor(user: User, peso: Number, altura: Number, convenio: string){
        this.user = user;
        this.peso = peso;
        this.altura = altura;
        this.convenio = convenio;
    }

  
}
