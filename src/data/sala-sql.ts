import { exec, query } from '@/lib/db';
import { ISalaCreateEdit } from '@/models';

const TABLE = 'Sala';

export async function listarSalas(): Promise<ISalaCreateEdit[]> {
    return query<ISalaCreateEdit>(`SELECT id_aluno, nome, descricao FROM ${TABLE} ORDER BY id_aluno DESC`);
}

export async function obterSala(id_aluno: number): Promise<ISalaCreateEdit | undefined> {
    const rows = await query<ISalaCreateEdit>(
        `SELECT id_aluno, nome, descricao FROM ${TABLE} WHERE id_aluno = ?`,
        [id_aluno]
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
    id_aluno: number,
    data: Partial<{ nome: string; descricao: string }>
) {
    const sets: string[] = [];
    const params: any[] = [];

    if (data.nome !== undefined) { sets.push('nome = ?'); params.push(data.nome); }
    if (data.descricao !== undefined) { sets.push('descricao = ?'); params.push(data.descricao); }

    if (!sets.length) return obterSala(id_aluno);

    params.push(id_aluno);
    await exec(`UPDATE ${TABLE} SET ${sets.join(', ')} WHERE id_aluno = ?`, params);
    return obterSala(id_aluno);
}

export async function excluirSala(id_aluno: number) {
    await exec(`DELETE FROM ${TABLE} WHERE id_aluno = ?`, [id_aluno]);
    return { ok: true };
}
