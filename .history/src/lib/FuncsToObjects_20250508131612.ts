import {Calendario, Agent, Informations} from '@/models/Calendario'
export default class Conversions{
    public  static toCalendario = async (formData: any) =>{
        const agent = new Agent(formData)
    }
}