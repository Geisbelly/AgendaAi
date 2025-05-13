export default class Token {
    id: string| null;
    token: string;
    created_at: Date | null;
    updated_at: Date | null;


    constructor(token: string){
        this.token = token,
        this.id = null,
        this.created_at = null,
        this.updated_at = null
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

    se

  
}
