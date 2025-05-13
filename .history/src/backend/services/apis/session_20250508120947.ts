import {useToken} from '../../../database/useToken'

export class AuthService{
    private static hookToken = useToken()

    static  login( token: string){
        this.hookToken.create({token:token})
    }

    static async getToken(){
        return this.hookToken.get()
    }

    static async isLogin(){
        if
    }

    static async logout() {
        await AsyncStorage.removeItem('authToken'); 

    }

    
}
