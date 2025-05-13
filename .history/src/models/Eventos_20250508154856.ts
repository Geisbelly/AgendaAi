export class Evento {
  id: number | null;
  calendar: number;
  notificationEnabled: boolean;
  informations: EventInformations;
  calendarTitle: string;
  created_at: Date | null;
  modified_at: Date | null;

  constructor(
    calendar: number,
    notificationEnabled: boolean,
    informations: EventInformations,
    calendarTitle: string,
    id: number | null = null,
    created_at: Date | null = null,
    modified_at: Date | null = null
  ) {
    this.id = id;
    this.calendar = calendar;
    this.notificationEnabled = notificationEnabled;
    this.informations = informations;
    this.calendarTitle = calendarTitle;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}


export interface EventInformations {
  title: string;
  description: string;
  meetingUrl: string;
  guests: string[]; // Ainda precisa ser serializado/deserializado
  dateStart: Date;
  dateEnd: Date;
  duration: number;
  privateFileUrl: string[]; // Também precisa de JSON
  color: string;
}

