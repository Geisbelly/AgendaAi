export default class Agendamento {
    private static proximoId = 1;
    id: number;
    cliente: string;
    tipo: string;
    dt_consulta: Date;
    dt_criacao: Date;
    hora_criacao: string;
    horario: string;
    profissional: string;
    color: string;
    status: string;

    constructor(cliente: string,tipo: string, data: Date, horario: string, profissional: string, color: string, status:string) {
        this.id = Agendamento.proximoId++; 
        this.cliente = cliente;
        this.tipo = tipo;
        this.dt_consulta = data;
        this.horario = horario;
        this.profissional = profissional;
        this.color = color;
        this.dt_criacao = new Date();
        this.hora_criacao = new Date().toLocaleTimeString();
        this.status = status;
    }

   
}
