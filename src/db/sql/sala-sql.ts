import { exec, query } from '@/db/db';
import { ISalaCreateEdit } from '@/models';

// ----------------------------------------------------------------------

const TABLE = 'Sala';

export async function listarSalas(): Promise<ISalaCreateEdit[]> {
    return query<ISalaCreateEdit>(`SELECT id, nome, descricao FROM ${TABLE} ORDER BY id DESC`);
}

export async function obterSala(id: number): Promise<ISalaCreateEdit | undefined> {
    const rows = await query<ISalaCreateEdit>(
        `SELECT id, nome, descricao FROM ${TABLE} WHERE id = ?`,
        [id]
    );
    return rows[0];
}

export async function criarSala(data: { nome: string; descricao: string }) {
    const res = await exec(
        `INSERT INTO ${TABLE} (nome, descricao) VALUES (?, ?)`,
        [data.nome, data.descricao]
    );
    return obterSala(res.insertId);
}

export async function atualizarSala(
    id: number,
    data: Partial<{ nome: string; descricao: string }>
) {
    const sets: string[] = [];
    const params: any[] = [];

    if (data.nome !== undefined) { sets.push('nome = ?'); params.push(data.nome); }
    if (data.descricao !== undefined) { sets.push('descricao = ?'); params.push(data.descricao); }

    if (!sets.length) return obterSala(id);

    params.push(id);
    await exec(`UPDATE ${TABLE} SET ${sets.join(', ')} WHERE id = ?`, params);
    return obterSala(id);
}

export async function excluirSala(id: number) {
    await exec(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);
    return { ok: true };
}
