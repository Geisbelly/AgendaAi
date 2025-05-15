import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {
    const queriesGeral = [
        `CREATE TABLE IF NOT EXISTS pessoa ( 
            id INTEGER PRIMARY KEY NOT NULL, 
            system_user_id INTEGER, 
            created_at TEXT, 
            deleted_at TEXT, 
            updated_at TEXT, 
            nome TEXT NOT NULL, 
            documento TEXT, 
            categoria_pessoa_id INTEGER NOT NULL,  
            tipo_pessoa INTEGER, 
            end_logradouro TEXT, 
            end_numero TEXT, 
            end_bairro TEXT, 
            end_complemento TEXT, 
            end_cep TEXT, 
            cidade_id INTEGER, 
            telefone TEXT, 
            celular TEXT, 
            email TEXT, 
            dt_nasc TEXT, 
            dt_admissao TEXT, 
            crmv TEXT, 
            validade_crmv TEXT, 
            classificacao_id INTEGER, 
            razao_social TEXT, 
            cor_calendario TEXT, 
            equipamento_proprio CHAR(1), 
            auxiliar CHAR(1), 
            apelido TEXT, 
            insc_estadual TEXT, 
            fl_visualiza_contrato CHAR(1)
        );`
    ];

    try {
        const geralDatabase = SQLite.openDatabaseSync('base.db'); // Use openDatabaseSync here
        
        queriesGeral.forEach((query: string) => {
            geralDatabase.execSync(query);
        });

        console.log("Database tables created successfully.");
        geralDatabase.closeSync()
    } catch (error) {
        console.error("Error initializing database:", error);
    } 
}
