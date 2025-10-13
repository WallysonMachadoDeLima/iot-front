import mysql from 'mysql2/promise';

// ----------------------------------------------------------------------

type DB = {
    pool: mysql.Pool;
};

const globalForDb = global as unknown as { _db?: DB };

function createPool() {
    const ssl =
        process.env.NEXT_PUBLIC_DB_SSL === 'true'
            ? { rejectUnauthorized: true }
            : undefined;

    const pool = mysql.createPool({
        host: process.env.NEXT_PUBLIC_DB_HOST!,
        port: Number(process.env.NEXT_PUBLIC_DB_PORT || 3306),
        user: process.env.NEXT_PUBLIC_DB_USER!,
        password: process.env.NEXT_PUBLIC_DB_PASS!,
        database: process.env.NEXT_PUBLIC_DB_NAME!,
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
