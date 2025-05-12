import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Login} from './builder/apiLogin'
import { SessionService } from "./session";
import { useAtualizacao } from "@/backend/database/useAtualizacao";

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

    static async  isTokenExpired  (token=null) {
        let tok;
        const auth = AsyncStorage.getItem('authToken');

        if (token) tok = token;
        else if (auth) tok = auth;
        else return true;

        const decoded: any = jwtDecode(String(tok));
        return decoded.exp * 1000 < Date.now(); 
    };

    static async refreshToken() {
        try {
            const  log = new Login()
            const dados = await AsyncStorage.getItem('url')

            const data = await log.relogin(String(dados))

            if (!dados) throw new Error("Credenciais ausentes");
            
            this.login(data.data);
            console.log("Token renovado com sucesso!");
            return data.data
        } catch (error) {
            console.error("Erro ao renovar token:", error);
            return null;
        }
    }
}
