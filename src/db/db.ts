// src/lib/db.ts
import mysql from 'mysql2/promise';




type DB = {
    pool: mysql.Pool;
};

const globalForDb = global as unknown as { _db?: DB };

function createPool() {
    const ssl =
        process.env.NEXT_PUBLIC_DB_SSL === 'true'
            ? { rejectUnauthorized: true } // troque conforme seu provedor (pode exigir CA)
            : undefined;

    const pool = mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'GestaoPatrimonio',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ssl,
        timezone: 'Z',
    });

    return { pool };
}

export const db = globalForDb._db ?? createPool();
if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') globalForDb._db = db;

// helper de consulta tipado
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await db.pool.execute(sql, params);
    return rows as T[];
}

// helper para executar INSERT/UPDATE/DELETE e obter info
export async function exec(sql: string, params?: any[]) {
    const [result] = await db.pool.execute(sql, params);
    return result as mysql.ResultSetHeader;
}
