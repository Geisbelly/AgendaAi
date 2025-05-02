import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
    if (!database) {
        database =  SQLite.openDatabaseSync('Geral.db');
    }
    return database;
}

export function useAtualizacao() {

    async function create(data: { tipo: string}) {
        try {
          const db = await getDatabase();
          const result = await db.runAsync(
            `INSERT INTO atualizacoes (token) VALUES (?)`,
            [data.tipo]
          );
          const recupereId = result.lastInsertRowId.toString();
          return { recupereId };
        } catch (error) {
          throw error;
        }
      }
      
    async function searchByTipo(tipo: string) {
        try {
            const db = await getDatabase();
            const query = "SELECT * FROM atualizacoes WHERE tipo LIKE ?";
            const response = await (db).getAllAsync<any>(query, `%${tipo}%`);
            return response;
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
   
  

    

    return { create, remove,searchByTipo };
}
