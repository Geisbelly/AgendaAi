import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
    if (!database) {
        database =  SQLite.openDatabaseSync('Geral.db');
    }
    return database;
}

export function useAtualizacao() {

    async function create(data: { token: string}) {
        try {
          const db = await getDatabase();
          const result = await db.runAsync(
            `INSERT INTO atualizacoes (token) VALUES (?)`,
            [data.token]
          );
          const recupereId = result.lastInsertRowId.toString();
          return { recupereId };
        } catch (error) {
          throw error;
        }
      }
      

   

    async function remove(id: number) {
        try {
            const db = await getDatabase();
            await (db).runAsync("DELETE FROM atualizacoes WHERE id = ?" + [id]);
        } catch (error) {
            throw error;
        }
    }
    async function get(id: number) {
        try {
            const db = await getDatabase();
            await (db).runAsync("SELECT FROM tok );
        } catch (error) {
            throw error;
        }
    }
   
  

    

    return { create, remove,get };
}
