import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
    if (!database) {
        database =  SQLite.openDatabaseSync('Geral.db');
    }
    return database;
}

export function useToken() {

    async function create(data: { token: string}) {
        try {
          const db = await getDatabase();
          const result = await db.runAsync(
            `INSERT INTO token (token) VALUES (?)`,
            [data.token]
          );
          const recupereId = result.lastInsertRowId.toString();
          return { recupereId };
        } catch (error) {
          throw error;
        }
      }
    async function get() {
        try {
          const db = await getDatabase();
          const result = await db.runAsync(
            `SELECT * FROM token`
          );
          return { result };
        } catch (error) {
          throw error;
        }
      }
      
   

    async function remove() {
        try {
            const db = await getDatabase();
            await (db).runAsync("DELETE FROM token WHERE id = ?" + [id]);
        } catch (error) {
            throw error;
        }
    }
   
  

    

    return { create, remove, get };
}
