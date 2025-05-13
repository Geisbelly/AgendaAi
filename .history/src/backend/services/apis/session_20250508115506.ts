import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthService{

    static  login( token: string){
        AsyncStorage.setItem('authToken', token)
    }

    static async pessoaDados(use:{}){
        AsyncStorage.setItem('pessoaData',JSON.stringify(use))
    }

    static async getPessoaDados(){
        return AsyncStorage.getItem('pessoaData')
    }

    static async  getDadosSession( ){
        const token = await AsyncStorage.getItem('authToken');
    
        if (!token) throw new Error("Token não encontrado");
        if (!token.includes(".")) throw new Error("Token inválido");

        return  JSON.stringify(jwtDecode(token));
    }

    static async isLogin(){
        const token = await AsyncStorage.getItem('authToken');
        return token!=null
    }

    static async logout() {
        await AsyncStorage.removeItem('authToken'); 
        await AsyncStorage.removeItem('url')
        await AsyncStorage.removeItem('pessoaData')
        await useAtualizacao().searchByTipo('execucao')

    }

    
}
