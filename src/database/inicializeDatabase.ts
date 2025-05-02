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
        `CREATE TABLE event_informations (
            id BIGINT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            meeting_url TEXT,
            guests TEXT[],  -- ou JSONB, dependendo do banco
            date_start BIGINT NOT NULL,  -- Timestamp em milissegundos
            date_end BIGINT NOT NULL,    -- Timestamp em milissegundos
            duration INTEGER NOT NULL,
            private_file_url TEXT[],  -- ou JSONB
            color VARCHAR(20)
        );`,
        `CREATE TABLE eventos (
            id BIGINT PRIMARY KEY,
            calendar_id BIGINT NOT NULL,  -- Relaciona com a tabela 'calendarios'
            notification_enabled BOOLEAN DEFAULT FALSE,
            event_informations_id BIGINT NOT NULL,  -- FK para event_informations
            calendar_title TEXT NOT NULL,  -- Título do calendário (como no campo 'calendarTitle')
            created_at BIGINT,
            modified_at BIGINT,
            
            FOREIGN KEY (calendar_id) REFERENCES calendarios(id),
            FOREIGN KEY (event_informations_id) REFERENCES event_informations(id)
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
