import * as SQLite from 'expo-sqlite';
import  EventInformations,{Evento}  from '../models/Eventos'; // Supondo que os modelos estejam em um arquivo separado

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
  if (!database) {
    database = SQLite.openDatabaseSync('Geral.db');
  }
  return database;
}

export function useEventos() {
  // Função para criar um evento
  async function create(data: Evento) {
    try {
      const db = await getDatabase();
      const result = await db.runAsync(
        `INSERT INTO evento (calendar, notificationEnabled, informations, calendarTitle, created_at, modified_at) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          data.calendar,
          data.notificationEnabled,
          JSON.stringify(data.informations), // Armazenando o objeto como string
          data.calendarTitle,
          data.created_at ? data.created_at.toISOString() : null, // Garantindo valor válido
          data.modified_at ? data.modified_at.toISOString() : null, // Garantindo valor válido
        ]
      );
      
      const recupereId = result.lastInsertRowId.toString();
      return { recupereId };
    } catch (error) {
      throw error;
    }
  }

  // Função para remover um evento pelo ID
  async function remove(id: number) {
    try {
      const db = await getDatabase();
      await db.runAsync('DELETE FROM evento WHERE id = ?', [id]);
    } catch (error) {
      throw error;
    }
  }

  // Função para recuperar todos os eventos
  async function getAll() {
    try {
      const db = await getDatabase();
      const result:Evento = db.getAllAsync('SELECT * FROM evento');
      if (result.rows.length > 0) {
        const eventos = [];
        for (let i = 0; i < result.rows.length; i++) {
          const row = result.rows.item(i);
          eventos.push({
            ...row,
            informations: JSON.parse(row.informations), // Recuperando a string como objeto
            created_at: new Date(row.created_at),
            modified_at: new Date(row.modified_at),
          });
        }
        return eventos;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  // Função para atualizar um evento
  async function update(id: number, data: Evento) {
    try {
      const db = await getDatabase();
      await db.runAsync(
        'UPDATE evento SET calendar = ?, notificationEnabled = ?, informations = ?, calendarTitle = ?, created_at = ?, modified_at = ? WHERE id = ?',
        [
          data.calendar,
          data.notificationEnabled,
          JSON.stringify(data.informations), // Armazenando o objeto como string
          data.calendarTitle,
          data.created_at?.toISOString(),
          data.modified_at?.toISOString(),
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
