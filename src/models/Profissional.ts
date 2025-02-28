import Agenda from './Agenda'
import User from './User'

export default class Cliente {
    user: User;
    crm: string;
    agenda: Agenda


    constructor(user: User, crm: string, agenda: Agenda){
        this.user = user;
        this.crm = crm;
        this.agenda = agenda;
    }

  
}
