import from ''
export class Informations {
    title: string;
    color: string;
    interval: number;
  
    constructor(title: string, color: string, interval: number) {
      this.title = title;
      this.color = color;
      this.interval = interval;
    }
  }
  
  export class Agent {
    canHandle: boolean;
    whatToSchedule: string;
    daysToShow: number;
    nSlotsToShow: number;
    offsetHours: number;
    defaultNotific: boolean;
    defaultMeetingUrl: string;
    messages: any[];
    params: any[];
    eventos: Eventos[];
  
    constructor(
      canHandle: boolean,
      whatToSchedule: string,
      daysToShow: number,
      nSlotsToShow: number,
      offsetHours: number,
      defaultNotific: boolean,
      defaultMeetingUrl: string,
      messages: any[],
      params: any[],
      eventos: Eventos[] = []
    ) {
      this.canHandle = canHandle;
      this.whatToSchedule = whatToSchedule;
      this.daysToShow = daysToShow;
      this.nSlotsToShow = nSlotsToShow;
      this.offsetHours = offsetHours;
      this.defaultNotific = defaultNotific;
      this.defaultMeetingUrl = defaultMeetingUrl;
      this.messages = messages;
      this.params = params;
      this.eventos = [];
    }
  }
  
  export class Calendario {
    id: number | null;
    informations: Informations;
    agent: Agent;
    id_calendarios: number | null;
    created_at: Date | null;
    updated_at: Date | null;
  
    constructor(
      informations: Informations,
      agent: Agent,
      id: number | null = null,
      id_calendarios: number | null = null,
      created_at: Date | null = null,
      updated_at: Date | null = null
    ) {
      this.id = id;
      this.informations = informations;
      this.agent = agent;
      this.id_calendarios = id_calendarios;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  