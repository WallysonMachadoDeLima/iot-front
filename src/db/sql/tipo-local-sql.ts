import { exec, query } from '@/db/db';
import { ITipoLocalCreateEdit } from '@/models';

const TABLE = 'TipoLocal';

async function create(data: { descricao: string }) {
    const res = await exec(
        `INSERT INTO ${TABLE} (descricao) VALUES (?)`,
        [data.descricao]
    );
    return findOne(res.insertId);
}


async function findAll(): Promise<ITipoLocalCreateEdit[]> {
    return query<ITipoLocalCreateEdit>(`SELECT * FROM ${TABLE} ORDER BY id_tipolocal DESC`);
}

async function findOne(id: number): Promise<ITipoLocalCreateEdit | undefined> {
    const rows = await query<ITipoLocalCreateEdit>(
        `SELECT * FROM ${TABLE} WHERE id_tipolocal = ?`,
        [id]
    );
    return rows[0];
}


async function update(
    id: number,
    data: Partial<{ descricao: string }>
) {
    const sets: string[] = [];
    const params: any[] = [];

    if (data.descricao !== undefined) { sets.push('descricao = ?'); params.push(data.descricao); }

    if (!sets.length) return findOne(id);

    params.push(id);
    await exec(`UPDATE ${TABLE} SET ${sets.join(', ')} WHERE id_tipolocal = ?`, params);
    return findOne(id);
}

async function remove(id: number) {
    await exec(`DELETE FROM ${TABLE} WHERE id_tipolocal = ?`, [id]);
    return { ok: true };
}


export const tipoLocalSql = {
    findAll,
    findOne,
    create,
    update,
    remove,
};