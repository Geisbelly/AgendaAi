import {useToken} from '../../database/useToken'
import { Calendario } from '@/models/Calendario';

export class AuthService{
    private static hookToken = useToken()
    private static agendas: Calendario[];


    static  login( token: string){
        this.hookToken.create({token:token})
    }

    static async getToken(){
        return this.hookToken.get()
    }

    static async isLogin(){
        const token = this.getToken()
        if(token !==null){
            return true
        }
        return false
    }

    static async logout() {
        this.hookToken.remove()
    }

    static async setAgendas(agenda:any) {
        
    }

    static async temporariAgenda(agenda:Calendario[]) {
        this.agendas = agenda
    }

    static async getTemporariAgenda(): Promise<Calendario[]> {
        return this.agendas;
    }

    static async aplicationUseCalendarioCreat(){

    }

    

    
}
