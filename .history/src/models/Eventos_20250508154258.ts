export class Evento {
  id: number | null;
  calendar: number;
  notificationEnabled: boolean;

  // Campos vindos da antiga classe EventInformations:
  title: string;
  description: string;
  meetingUrl: string;
  guests: string[];
  dateStart: Date;
  dateEnd: Date;
  duration: number;
  privateFileUrl: string[];
  color: string;

  calendarTitle: string;
  created_at: Date | null;
  modified_at: Date | null;

  constructor(
    calendar: number,
    notificationEnabled: boolean,
    title: string,
    description: string,
    meetingUrl: string,
    guests: string[],
    dateStart: Date,
    dateEnd: Date,
    duration: number,
    privateFileUrl: string[],
    color: string,
    calendarTitle: string,
    id: number | null = null,
    created_at: Date | null = null,
    modified_at: Date | null = null
  ) {
    this.id = id;
    this.calendar = calendar;
    this.notificationEnabled = notificationEnabled;

    this.title = title;
    this.description = description;
    this.meetingUrl = meetingUrl;
    this.guests = guests;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.duration = duration;
    this.privateFileUrl = privateFileUrl;
    this.color = color;

    this.calendarTitle = calendarTitle;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}


