import {useToken} from '../../../database/useToken'

export class AuthService{
    private static hookToken = useToken()

    static  login( token: string){
        this.hookToken.create({token:token})
    }

    static async getToken(){
        this.hookToken.create({token:token})
    }

    static async isLogin(){
        const token = await AsyncStorage.getItem('authToken');
        return token!=null
    }

    static async logout() {
        await AsyncStorage.removeItem('authToken'); 

    }

    
}
