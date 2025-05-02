import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {
    const queriesGeral = [
        `CREATE TABLE IF NOT EXISTS token ( 
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         token TEXT NOT NULL,
         created_at TEXT DEFAULT (datetime('now', 'localtime')),
         updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
        );`,
        `CREATE TABLE IF NOT EXISTS calendarios ( 
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         id_calendarios TEXT NOT NULL,
         created_at TEXT DEFAULT (datetime('now', 'localtime')),
         updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
        );`,
        
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
