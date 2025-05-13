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
        );`,
        `CREATE TABLE IF NOT EXISTS servico ( 
            id INTEGER PRIMARY KEY NOT NULL, 
            nome TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS produto ( 
            id INTEGER PRIMARY KEY NOT NULL, 
            nome TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS fazenda( 
            id INTEGER PRIMARY KEY NOT NULL, 
            nome TEXT NOT NULL, 
            endereco TEXT, 
            dono_id INTEGER NOT NULL, 
            latitude TEXT, 
            longitude TEXT, 
            qtde_animais INTEGER, 
            cidade_id INTEGER 
        );`,
        `CREATE TABLE IF NOT EXISTS contrato( 
            id INTEGER PRIMARY KEY NOT NULL, 
            cliente_id INTEGER NOT NULL, 
            nome TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS contrato_fazenda( 
            id_contrato INTEGER , 
            fazenda_id INTEGER ,
            dono_id INTEGER ,
            endereco TEXT,
            nome_fazenda TEXT,
            nome_pessoa TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS contrato_execucao( 
            id_api INTEGER,
            id INTEGER PRIMARY KEY NOT NULL, 
            system_user_id INTEGER, 
            system_user_auditoria_id REAL, 
            contrato_id INTEGER, 
            contrato_fazenda_id INTEGER, 
            produto_id INTEGER, 
            servico_id INTEGER, 
            responsavel_id INTEGER, 
            gestor_id INTEGER, 
            fazenda_id INTEGER, 
            produto_reutilizavel_fase_id INTEGER, 
            created_at TEXT, 
            deleted_at TEXT, 
            updated_at TEXT, 
            dia_execucao DATE, 
            qtde REAL, 
            obs TEXT, 
            anexo BLOB, 
            data_hora_inicio TEXT, 
            data_hora_fim TEXT, 
            hora_inicio TEXT, 
            hora_fim TEXT, 
            dia TEXT, 
            app CHAR(1), 
            fl_auditado CHAR(1) DEFAULT 'F', 
            dt_hora_auditoria DATE,
            id_anexo INTEGER,
            status TEXT CHECK (status IN ('pendente', 'executado', 'cancelado', 'erro', 'sucesso')),
            retorno TEXT,
            dt_resposta TEXT,
            dt_atualizacao TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
        );`,
        `CREATE TABLE IF NOT EXISTS notificacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            data TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
            status TEXT DEFAULT 'pendente'
        );`,
        `CREATE TABLE IF NOT EXISTS atualizacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo TEXT UNIQUE,
            data TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
        );`,
        `CREATE TABLE IF NOT EXISTS imagens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE,
            base64 TEXT,
            uri TEXT,
            url TEXT,
            created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
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
