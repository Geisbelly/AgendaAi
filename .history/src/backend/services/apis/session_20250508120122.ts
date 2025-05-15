import from ''

export class AuthService{

    static  login( token: string){
        AsyncStorage.setItem('authToken', token)
    }

    static async pessoaDados(use:{}){
        AsyncStorage.setItem('pessoaData',JSON.stringify(use))
    }

    static async isLogin(){
        const token = await AsyncStorage.getItem('authToken');
        return token!=null
    }

    static async logout() {
        await AsyncStorage.removeItem('authToken'); 

    }

    
}
