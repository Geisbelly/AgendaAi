import { Calendario, Agent, Informations } from '@/models/Calendario';

export default class Conversions {
  public static toCalendario = async (formData: any): Promise<Calendario> => {
    const { id, created_at, modified_at, informations, agent } = formData;

    const info = new Informations(
      id,
      informations.title,
      informations.color,
      informations.interval
    );

    const agente = new Agent(
      id,
      agent.canHandle,
      agent.whatToSchedule,
      agent.daysToShow,
      agent.nSlotsToShow,
      agent.offsetHours,
      agent.defaultNotific,
      agent.defaultMeetingUrl,
      agent.messages ?? [],
      agent.params ?? []
    );

    const calendario = new Calendario(
      id,
      created_at,
      modified_at,
      info,
      agente
    );

    return calendario;
  };
}
