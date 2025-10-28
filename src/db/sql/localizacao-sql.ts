import { exec, query } from '@/db/db';
import { ILocalizacaoCreateEdit, ILocalizacaoFindAll } from '@/models';

const TABLE = 'Localizacao';

async function create(data: ILocalizacaoCreateEdit) {
    const res = await exec(
        `INSERT INTO ${TABLE} (fk_id_tipolocal, nome, ativo) VALUES (?,?,?)`,
        [data.fk_id_tipolocal, data.nome, data.ativo ?? 1]
    );
    return findOne(res.insertId);
}

async function findAll(): Promise<ILocalizacaoFindAll[]> {
    return query<ILocalizacaoFindAll>(
        `SELECT L.*, T.descricao AS tipo FROM ${TABLE} L LEFT JOIN TipoLocal T ON L.fk_id_tipolocal = T.id_tipolocal ORDER BY id_local DESC`
    );
}

async function findOne(id: number): Promise<ILocalizacaoFindAll | undefined> {
    const rows = await query<ILocalizacaoFindAll>(
        `SELECT L.*, T.descricao AS tipo FROM ${TABLE} L LEFT JOIN TipoLocal T ON L.fk_id_tipolocal = T.id_tipolocal WHERE id_local = ?`,
        [id]
    );
    return rows[0];
}

async function update(id: number, data: Partial<ILocalizacaoCreateEdit>) {
    const sets: string[] = [];
    const params: any[] = [];

    if (data.fk_id_tipolocal !== undefined) { sets.push('fk_id_tipolocal = ?'); params.push(data.fk_id_tipolocal); }
    if (data.nome !== undefined) { sets.push('nome = ?'); params.push(data.nome); }
    if (data.ativo !== undefined) { sets.push('ativo = ?'); params.push(data.ativo); }

    if (!sets.length) return findOne(id);

    params.push(id);
    await exec(`UPDATE ${TABLE} SET ${sets.join(', ')} WHERE id_local = ?`, params);
    return findOne(id);
}

async function remove(id: number) {
    await exec(`DELETE FROM ${TABLE} WHERE id_local = ?`, [id]);
    return { ok: true };
}

export const localizacaoSql = {
    findAll,
    findOne,
    create,
    update,
    remove,
};

