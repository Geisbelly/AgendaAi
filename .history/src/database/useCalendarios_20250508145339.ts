import * as SQLite from 'expo-sqlite';
import { Agent, Calendario, Informations } from '../models/Calendario';

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
  if (!database) {
    database = SQLite.openDatabaseSync('Geral.db');
  }
  return database;
}

export function useCalendario() {
  // Função para criar um novo calendário com informações e agentes
  async function create(calendario: Calendario): Promise<number> {
    const db = await getDatabase();

    try {
      // Insere o calendário
      const resultCalendario = await db.(
        `INSERT INTO calendarios (id_calendarios) VALUES (?)`,
        [calendario.id_calendarios ?? '']
      );
      const calendarioId = resultCalendario.lastInsertRowId;

      // Insere as informações do calendário
      const { title, color, interval } = calendario.informations;
      await db.runAsync(
        `INSERT INTO informations (calendario_id, title, color, interval) VALUES (?, ?, ?, ?)`,
        [calendarioId, title, color, interval]
      );

      // Insere o agente associado ao calendário
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

      // Retorna o ID do calendário recém-criado
      return calendarioId;
    } catch (error) {
      console.error("Erro ao criar calendário:", error);
      throw error; // Propaga o erro caso algo falhe
    }
  }

  // Função para remover um calendário
  async function remove(id: number): Promise<void> {
    const db = await getDatabase();

    try {
      // Remove o calendário
      await db.runAsync(`DELETE FROM calendarios WHERE id = ?`, [id]);

      // Remove as informações e agentes vinculados
      await db.runAsync(`DELETE FROM informations WHERE calendario_id = ?`, [id]);
      await db.runAsync(`DELETE FROM agents WHERE calendario_id = ?`, [id]);
    } catch (error) {
      console.error("Erro ao remover calendário:", error);
      throw error;
    }
  }

  // Função para pegar todos os calendários
  async function getAll(): Promise<Calendario[]> {
    const db = await getDatabase();

    try {
      // Busca todos os calendários
      const calendarios = await db.runAsync(`SELECT * FROM calendarios`);

      const resultados: Calendario[] = [];

      for (const row of calendarios) {
        const calendarioId = row.id;

        // Busca as informações associadas
        const info = await db.runAsync(
          `SELECT * FROM informations WHERE calendario_id = ?`,
          [calendarioId]
        );

        // Busca o agente associado
        const agent = await db.runAsync(
          `SELECT * FROM agents WHERE calendario_id = ?`,
          [calendarioId]
        );

        resultados.push({
          ...row,
          informations: info[0],
          agent: agent[0]
        });
      }

      return resultados;
    } catch (error) {
      console.error("Erro ao buscar calendários:", error);
      throw error;
    }
  }

  return {
    create,
    remove,
    getAll
  };
}
