
import { exec, query } from '@/db/db';
import { IItemCreateEdit, IItemFindAll } from '@/models';

const TABLE = 'Item';

async function create(data: IItemCreateEdit): Promise<IItemFindAll | undefined> {
    const res = await exec(
        `INSERT INTO ${TABLE} (tag_codigo, nome, descricao, ativo, fk_id_local_origem) VALUES (?, ?, ?, ?, ?)`,
        [data.tag_codigo, data.nome, data.descricao, data.ativo ?? 1, data.fk_id_local_origem]
    );
    return findOne(res.insertId);
}

async function findAll(): Promise<IItemFindAll[]> {
    return query<IItemFindAll>(
        `SELECT 
            i.*, 
            JSON_OBJECT('id_local', l.id_local, 'nome', l.nome) as local_origem
         FROM ${TABLE} i
         LEFT JOIN Localizacao l ON i.fk_id_local_origem = l.id_local
         ORDER BY i.id_item DESC`
    );
}

async function findOne(id: number): Promise<IItemFindAll | undefined> {
    const rows = await query<IItemFindAll>(
        `SELECT 
            i.*, 
            JSON_OBJECT('id_local', l.id_local, 'nome', l.nome) as local_origem
         FROM ${TABLE} i
         LEFT JOIN Localizacao l ON i.fk_id_local_origem = l.id_local
         WHERE i.id_item = ?`,
        [id]
    );
    return rows[0];
}

async function update(id: number, data: Partial<IItemCreateEdit>): Promise<IItemFindAll | undefined> {
    const sets: string[] = [];
    const params: any[] = [];

    if (data.tag_codigo !== undefined) { sets.push('tag_codigo = ?'); params.push(data.tag_codigo); }
    if (data.nome !== undefined) { sets.push('nome = ?'); params.push(data.nome); }
    if (data.descricao !== undefined) { sets.push('descricao = ?'); params.push(data.descricao); }
    if (data.ativo !== undefined) { sets.push('ativo = ?'); params.push(data.ativo); }
    if (data.fk_id_local_origem !== undefined) { sets.push('fk_id_local_origem = ?'); params.push(data.fk_id_local_origem); }

    if (!sets.length) return findOne(id);

    params.push(id);
    await exec(`UPDATE ${TABLE} SET ${sets.join(', ')} WHERE id_item = ?`, params);
    return findOne(id);
}

async function remove(id: number): Promise<{ ok: true }> {
    await exec(`DELETE FROM ${TABLE} WHERE id_item = ?`, [id]);
    return { ok: true };
}

export const itemSql = {
    findAll,
    findOne,
    create,
    update,
    remove,
};
