import * as SQLite from 'expo-sqlite';
import { EventInformations, Evento } from '../models/Eventos';

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
  if (!database) {
    database = SQLite.openDatabaseSync('Geral.db');
  }
  return database;
}

export function useEventos() {
  // Cria um evento
  async function create(data: Evento) {
    try {
      const db = await getDatabase();

      const infoResult = await db.runAsync(
        `INSERT INTO event_informations 
        (id, title, description, meeting_url, guests, date_start, date_end, duration, private_file_url, color) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.id, // Usar o mesmo ID que será usado no evento
          data.informations.title,
          data.informations.description,
          data.informations.meetingUrl,
          JSON.stringify(data.informations.guests),
          data.informations.dateStart ? data.informations.dateStart.toISOString() : null,
          data.informations.dateEnd ? data.informations.dateEnd.toISOString() : null,
          data.informations.duration,
          JSON.stringify(data.informations.privateFileUrl),
          data.informations.color,
        ]
      );

      const eventoResult = await db.runAsync(
        `INSERT INTO eventos 
        (id, calendar_id, notification_enabled, event_informations_id, calendar_title, created_at, modified_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          data.id,
          data.calendar,
          data.notificationEnabled ? 1 : 0,
          data.id,
          data.calendarTitle,
          data.created_at ? data.created_at.toISOString() : null,
          data.modified_at ? data.modified_at.toISOString() : null,
        ]
      );

      return { recupereId: data.id ? data.id.toString() : '' };
    } catch (error) {
      throw error;
    }
  }

  // Remove um evento
  async function remove(id: number) {
    try {
      const db = await getDatabase();
      await db.runAsync('DELETE FROM eventos WHERE id = ?', [id]);
    } catch (error) {
      throw error;
    }
  }

  // Recupera todos os eventos
  async function getAll(): Promise<Evento[]> {
    try {
      const db = await getDatabase();
      const result = await db.getAllAsync(`
        SELECT e.*, ei.title as info_title, ei.description as info_description, ei.meeting_url,
               ei.guests, ei.date_start, ei.date_end, ei.duration, ei.private_file_url, ei.color
        FROM eventos e
        JOIN event_informations ei ON e.event_informations_id = ei.id
      `);

      const eventos: Evento[] = result.map((row: any) => ({
        id: row.id,
        calendar: row.calendar_id,
        notificationEnabled: !!row.notification_enabled,
        calendarTitle: row.calendar_title,
        created_at: row.created_at,
        modified_at: row.modified_at,
        informations: {
          title: row.info_title,
          description: row.info_description,
          meetingUrl: row.meeting_url,
          guests: JSON.parse(row.guests || '[]'),
          dateStart: row.date_start,
          dateEnd: row.date_end,
          duration: row.duration,
          privateFileUrl: JSON.parse(row.private_file_url || '[]'),
          color: row.color
        }
      }));

      return eventos;
    } catch (error) {
      throw error;
    }
  }

  // Atualiza um evento
  async function update(id: number, data: Evento) {
    try {
      const db = await getDatabase();

      await db.runAsync(
        `UPDATE event_informations 
        SET title = ?, description = ?, meeting_url = ?, guests = ?, 
            date_start = ?, date_end = ?, duration = ?, private_file_url = ?, color = ?
        WHERE id = ?`,
        [
          data.informations.title,
          data.informations.description,
          data.informations.meetingUrl,
          JSON.stringify(data.informations.guests),
          data.informations.dateStart,
          data.informations.dateEnd,
          data.informations.duration,
          JSON.stringify(data.informations.privateFileUrl),
          data.informations.color,
          id
        ]
      );

      await db.runAsync(
        `UPDATE eventos 
        SET calendar_id = ?, notification_enabled = ?, calendar_title = ?, 
            created_at = ?, modified_at = ?
        WHERE id = ?`,
        [
          data.calendar,
          data.notificationEnabled ? 1 : 0,
          data.calendarTitle,
          data.created_at,
          data.modified_at,
          id
        ]
      );
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    remove,
    getAll,
    update
  };
}
