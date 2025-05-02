import * as SQLite from 'expo-sqlite';
import { Agent, Calendario, Informations } from '../models/Calendario'; // ou de onde estiverem

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
  if (!database) {
    database = SQLite.openDatabaseSync('Geral.db');
  }
  return database;
}

export function useCalendario() {
  async function create(calendario: Calendario): Promise<number> {
    const db = await getDatabase();

    // Cria o calendário base
    const result = await db.runAsync(
      `INSERT INTO calendarios (id_calendarios) VALUES (?)`,
      [calendario.id_calendarios ?? '']
    );

    const calendarioId = result.lastInsertRowId;

    // Cria informações vinculadas
    const { title, color, interval } = calendario.informations;
    await db.runAsync(
      `INSERT INTO informations (calendario_id, title, color, interval) VALUES (?, ?, ?, ?)`,
      [calendarioId, title, color, interval]
    );

    // Cria agente vinculado
    const {
      canHandle,
      whatToSchedule,
      daysToShow,
      nSlotsToShow,
      offsetHours,
      defaultNotific,
      defaultMeetingUrl,
      messages,
      params
    } = calendario.agent;

    await db.runAsync(
      `INSERT INTO agents (
        calendario_id, canHandle, whatToSchedule, daysToShow, nSlotsToShow,
        offsetHours, defaultNotific, defaultMeetingUrl, messages, params
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        calendarioId,
        canHandle ? 1 : 0,
        whatToSchedule,
        daysToShow,
        nSlotsToShow,
        offsetHours,
        defaultNotific ? 1 : 0,
        defaultMeetingUrl,
        JSON.stringify(messages),
        JSON.stringify(params)
      ]
    );

    return calendarioId;
  }

  async function remove(id: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM calendarios WHERE id = ?`, [id]);
    // Os dados em agents e informations serão apagados por ON DELETE CASCADE
  }

  async function getAll(): Promise<Calendario[]> {
    const db = await getDatabase();
    const calendarios = await db.getAllAsync<any>(`SELECT * FROM calendarios`);

    const resultados: Calendario[] = [];

    for (const row of calendarios) {
      const calendarioId = row.id;

      const info = await db.getFirstAsync<any>(
        `SELECT * FROM informations WHERE calendario_id = ?`,
        [calendarioId]
      );

      const agent = await db.getFirstAsync<any>(
        `SELECT * FROM agents WHERE calendario_id = ?`,
        [calendarioId]
      );

      if (!info || !agent) continue;

      const calendario = new Calendario(
        new Informations(info.title, info.color, info.interval),
        new Agent(
          !!agent.canHandle,
          agent.whatToSchedule,
          agent.daysToShow,
          agent.nSlotsToShow,
          agent.offsetHours,
          !!agent.defaultNotific,
          agent.defaultMeetingUrl,
          JSON.parse(agent.messages ?? '[]'),
          JSON.parse(agent.params ?? '[]')
        ),
        calendarioId,
        row.id_calendarios,
        new Date(row.created_at),
        new Date(row.updated_at)
      );

      resultados.push(calendario);
    }

    return resultados;
  }

  async function get(id:number): Promise<Calendario> {
    const db = await getDatabase();
    const row = await db.getAllAsync<any>(`SELECT * FROM calendarios WHERE id_calendario = ?`, [id]);

    const resultados: Calendario[] = [];


      const calendarioId = row.id;

      const info = await db.getFirstAsync<any>(
        `SELECT * FROM informations WHERE calendario_id = ?`,
        [calendarioId]
      );

      const agent = await db.getFirstAsync<any>(
        `SELECT * FROM agents WHERE calendario_id = ?`,
        [calendarioId]
      );

      if (!info || !agent) continue;

      const calendario = new Calendario(
        new Informations(info.title, info.color, info.interval),
        new Agent(
          !!agent.canHandle,
          agent.whatToSchedule,
          agent.daysToShow,
          agent.nSlotsToShow,
          agent.offsetHours,
          !!agent.defaultNotific,
          agent.defaultMeetingUrl,
          JSON.parse(agent.messages ?? '[]'),
          JSON.parse(agent.params ?? '[]')
        ),
        calendarioId,
        row.id_calendarios,
        new Date(row.created_at),
        new Date(row.updated_at)
      );

      resultados.push(calendario);
    }

    return resultados;
  }



  return { create, remove, getAll };
}
