import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {
    const queriesGeral = [
        `CREATE TABLE IF NOT EXISTS token ( 
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          token TEXT NOT NULL,
          created_at TEXT DEFAULT (datetime('now', 'localtime')),
          updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        );`,
      
        `CREATE TABLE IF NOT EXISTS calendarios ( 
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_calendarios INTEGER,
          created_at TEXT,
          updated_at TEXT,
          visivel BOOLEAN DEFAULT FALSE
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
          whatToSchedule TEXT NOT NULL,
          daysToShow INTEGER NOT NULL,
          nSlotsToShow INTEGER NOT NULL,
          offsetHours INTEGER NOT NULL,
          defaultNotific BOOLEAN NOT NULL,
          defaultMeetingUrl TEXT,
          messages TEXT, -- será stringificada (JSON)
          params TEXT,   -- idem
          FOREIGN KEY (calendario_id) REFERENCES calendarios(id) ON DELETE CASCADE
        );`,
      
        `CREATE TABLE IF NOT EXISTS event_informations (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            meeting_url TEXT,
            guests TEXT,           
            date_start INTEGER NOT NULL,
            date_end INTEGER NOT NULL,
            duration INTEGER NOT NULL,
            private_file_url TEXT, 
            color TEXT
        );

        CREATE TABLE IF NOT EXISTS eventos (
            id INTEGER PRIMARY KEY,
            calendar_id INTEGER NOT NULL,
            notification_enabled BOOLEAN DEFAULT FALSE,
            event_informations_id INTEGER NOT NULL,
            calendar_title TEXT NOT NULL,
            created_at INTEGER,
            modified_at INTEGER,
            FOREIGN KEY (calendar_id) REFERENCES calendarios(id) ON DELETE CASCADE,
            FOREIGN KEY (event_informations_id) REFERENCES event_informations(id) ON DELETE CASCADE
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
