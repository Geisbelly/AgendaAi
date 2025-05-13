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

        `CREATE TABLE IF NOT EXISTS informations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            calendario_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            color TEXT NOT NULL,
            interval INTEGER NOT NULL,
            FOREIGN KEY (calendario_id) REFERENCES calendarios(id) ON DELETE CASCADE
        );`,
        `CREATE TABLE IF NOT EXISTS agents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            calendario_id INTEGER NOT NULL,
            canHandle BOOLEAN NOT NULL,
            whatToSchedule TEXT,
            daysToShow INTEGER,
            nSlotsToShow INTEGER,
            offsetHours INTEGER,
            defaultNotific BOOLEAN,
            defaultMeetingUrl TEXT,
            messages TEXT,
            params TEXT,
            FOREIGN KEY (calendario_id) REFERENCES calendarios(id) ON DELETE CASCADE
        );`,
        `CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            calendario_id INTEGER NOT NULL,
            start TEXT NOT NULL,
            end TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            location TEXT,
            FOREIGN KEY (calendario_id) REFERENCES calendarios(id) ON DELETE CASCADE
        );`,
        ``	
        
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
