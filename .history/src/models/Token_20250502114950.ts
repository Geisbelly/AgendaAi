export default class Token {
    id: string| null;
    token: string;
    created_at: Date | null;


    constructor(token: string){
        this.token = token
        this.id = null
    }

    setId(id: string) {
        this.id = id
    }

    getId() {
        return this.id
    }
 
    getToken() {
        return this.token
    }

  
}
