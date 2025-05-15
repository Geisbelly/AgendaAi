

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

