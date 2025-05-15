import { Calendario, Agent, Informations } from '@/models/Calendario'
import Evento from '@/models/Eventos' // Caso você vá popular depois

export default class Conversions {
  public static toCalendario = (json: any): Calendario => {
    const info = new Informations(
      json.informations.title,
      json.informations.color,
      json.informations.interval
    )

    const agent = new Agent(
      json.agent.canHandle,
      json.agent.whatToSchedule,
      json.agent.daysToShow,
      json.agent.nSlotsToShow,
      json.agent.offsetHours,
      json.agent.defaultNotific,
      json.agent.defaultMeetingUrl,
      json.agent.messages || [],
      json.agent.params || []
    )

    const calendario = new Calendario(
      info,
      agent,
      json.id ?? null,
      json.id_calendarios ?? null,
      json.created_at ? new Date(json.created_at) : null,
      json.modified_at ? new Date(json.modified_at) : null,
      [], // Eventos pode vir depois
      true // visível por padrão, ou você pode puxar de `json.visivel` se existir
    )

    return calendario
  }
}
