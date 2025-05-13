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
        const token = this.getToken()
        if(token !==null){
            r
        }
    }

    static async logout() {
        await AsyncStorage.removeItem('authToken'); 

    }

    
}
