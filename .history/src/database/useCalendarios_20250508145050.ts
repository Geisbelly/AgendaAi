import * as SQLite from 'expo-sqlite';
import { Agent, Calendario, Informations } from '../models/Calendario'; // ou de onde estiverem

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
  if (!database) {
    database = SQLite.openDatabaseAsync('Geral.db'); // Não usamos openDatabaseSync aqui, pois estamos lidando com operações assíncronas
  }
  return database;
}

export function useCalendario() {
  // Criação do calendário com seus dados
  async function create(calendario: Calendario): Promise<number> {
    const db = await getDatabase();

    // Cria o calendário base
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO calendarios (id_calendarios) VALUES (?)`,
          [calendario.id_calendarios ?? ''],
          (_, result) => {
            const calendarioId = result.insertId;

            // Cria informações vinculadas
            const { title, color, interval } = calendario.informations;
            tx.executeSql(
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

            tx.executeSql(
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
              ],
              () => resolve(calendarioId), // Resolve com o id do novo calendário
              (_, error) => reject(error) // Reject em caso de erro
            );
          },
          (_, error) => reject(error) // Reject em caso de erro
        );
      });
    });
  }

  // Remover um calendário
  async function remove(id: number): Promise<void> {
    const db = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM calendarios WHERE id = ?`,
          [id],
          () => resolve(), // Resolve quando a remoção for bem-sucedida
          (_, error) => reject(error) // Reject em caso de erro
        );
      });
    });
  }

  // Recuperar todos os calendários
  async function getAll(): Promise<Calendario[]> {
    const db = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM calendarios`,
          [],
          (_, result) => {
            const calendarios: Calendario[] = [];

            // Processa os resultados de cada linha
            result.rows._array.forEach((row: any) => {
              const calendarioId = row.id;

              // Busca as informações do calendário
              tx.executeSql(
                `SELECT * FROM informations WHERE calendario_id = ?`,
                [calendarioId],
                (_, resultInfo) => {
                  const info = resultInfo.rows.item(0);

                  // Busca o agente do calendário
                  tx.executeSql(
                    `SELECT * FROM agents WHERE calendario_id = ?`,
                    [calendarioId],
                    (_, resultAgent) => {
                      const agent = resultAgent.rows.item(0);
                      if (!info || !agent) return;

                      // Cria o objeto Calendário
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
                        new Date(row.updated_at),
                        row.visivel
                      );

                      calendarios.push(calendario);

                      if (calendarios.length === result.rows.length) {
                        resolve(calendarios); // Resolve quando todos os calendários forem processados
                      }
                    },
                    (_, error) => reject(error) // Reject em caso de erro
                  );
                },
                (_, error) => reject(error) // Reject em caso de erro
              );
            });
          },
          (_, error) => reject(error) // Reject em caso de erro
        );
      });
    });
  }

  // Recuperar um calendário específico
  async function get(id: number): Promise<Calendario | null> {
    const db = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM calendarios WHERE id_calendarios = ?`,
          [id],
          (_, result) => {
            const row = result.rows.item(0);
            if (!row) return resolve(null);

            const calendarioId = row.id;

            // Busca as informações do calendário
            tx.executeSql(
              `SELECT * FROM informations WHERE calendario_id = ?`,
              [calendarioId],
              (_, resultInfo) => {
                const info = resultInfo.rows.item(0);

                // Busca o agente do calendário
                tx.executeSql(
                  `SELECT * FROM agents WHERE calendario_id = ?`,
                  [calendarioId],
                  (_, resultAgent) => {
                    const agent = resultAgent.rows.item(0);
                    if (!info || !agent) return resolve(null);

                    // Cria e resolve o objeto Calendário
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
                      new Date(row.updated_at),
                      row.visivel
                    );
                    resolve(calendario);
                  },
                  (_, error) => reject(error) // Reject em caso de erro
                );
              },
              (_, error) => reject(error) // Reject em caso de erro
            );
          },
          (_, error) => reject(error) // Reject em caso de erro
        );
      });
    });
  }

  return { create, remove, getAll, get };
}
