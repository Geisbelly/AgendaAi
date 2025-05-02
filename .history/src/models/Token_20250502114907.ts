export default class Token {
    id: string| null;
    token: string;


    constructor(token: string){
        this.token = token
    }

    setId(id: string) {
        this.id = id
    }

    

  
}
