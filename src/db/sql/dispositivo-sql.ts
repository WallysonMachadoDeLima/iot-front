import { exec, query } from '@/db/db';
import { IDispositivoCreateEdit, IDispositivoFindAll } from '@/models';

const TABLE = 'Dispositivo';

async function create(data: IDispositivoCreateEdit) {
    const res = await exec(
        `INSERT INTO ${TABLE} (identificador, descricao, tipo, ativo, fk_id_local) VALUES (?,?,?,?,?)`,
        [data.identificador, data.descricao ?? null, data.tipo, data.ativo ?? 1, data.fk_id_local]
    );
    return findOne(res.insertId);
}

async function findAll(): Promise<IDispositivoFindAll[]> {
    return query<IDispositivoFindAll>(
        `SELECT D.*, L.nome AS localizacao 
         FROM ${TABLE} D 
         LEFT JOIN Localizacao L ON D.fk_id_local = L.id_local 
         ORDER BY id_dispositivo DESC`
    );
}

async function findOne(id: number): Promise<IDispositivoFindAll | undefined> {
    const rows = await query<IDispositivoFindAll>(
        `SELECT D.*, L.nome AS localizacao 
         FROM ${TABLE} D 
         LEFT JOIN Localizacao L ON D.fk_id_local = L.id_local 
         WHERE id_dispositivo = ?`,
        [id]
    );
    return rows[0];
}

async function update(id: number, data: Partial<IDispositivoCreateEdit>) {
    const sets: string[] = [];
    const params: any[] = [];

    if (data.identificador !== undefined) { sets.push('identificador = ?'); params.push(data.identificador); }
    if (data.descricao !== undefined) { sets.push('descricao = ?'); params.push(data.descricao); }
    if (data.tipo !== undefined) { sets.push('tipo = ?'); params.push(data.tipo); }
    if (data.ativo !== undefined) { sets.push('ativo = ?'); params.push(data.ativo); }
    if (data.fk_id_local !== undefined) { sets.push('fk_id_local = ?'); params.push(data.fk_id_local); }

    if (!sets.length) return findOne(id);

    params.push(id);
    await exec(`UPDATE ${TABLE} SET ${sets.join(', ')} WHERE id_dispositivo = ?`, params);
    return findOne(id);
}

async function remove(id: number) {
    await exec(`DELETE FROM ${TABLE} WHERE id_dispositivo = ?`, [id]);
    return { ok: true };
}

export const dispositivoSql = {
    findAll,
    findOne,
    create,
    update,
    remove,
};