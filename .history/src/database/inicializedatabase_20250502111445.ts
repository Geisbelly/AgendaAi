import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {
    const queriesGeral = [
        `CREATE TABLE IF NOT EXISTS pessoa ( 
         
        );`
    ];

    try {
        const geralDatabase = SQLite.openDatabaseSync('Geral.db'); // Use openDatabaseSync here
        
        queriesGeral.forEach((query: string) => {
            geralDatabase.execSync(query);
        });

        console.log("Database tables created successfully.");
        geralDatabase.closeSync()
    } catch (error) {
        console.error("Error initializing database:", error);
    } 
}
