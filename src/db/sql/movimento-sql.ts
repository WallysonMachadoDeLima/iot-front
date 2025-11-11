import { exec, query } from '@/db/db';
import { IMovimentoCreateEdit, IMovimentoFindAll } from '@/models';

const TABLE = 'Movimento';

async function create(data: IMovimentoCreateEdit) {
  const res = await exec(
    `INSERT INTO ${TABLE}
      (movido_em, observacoes, fk_id_item, fk_id_local_origem, fk_id_local_destino, fk_id_dispositivo)
     VALUES (?,?,?,?,?,?)`,
    [
      data.movido_em,
      data.observacoes ?? null,
      data.fk_id_item,
      data.fk_id_local_origem ?? null,
      data.fk_id_local_destino,
      data.fk_id_dispositivo,
    ]
  );
  return findOne(res.insertId);
}

async function findAll(): Promise<IMovimentoFindAll[]> {
  return query<IMovimentoFindAll>(
    `SELECT
       M.*,
       I.nome  AS item,
       LO.nome AS local_origem,
       LD.nome AS local_destino,
       D.nome  AS dispositivo
     FROM ${TABLE} M
     LEFT JOIN Item        I  ON I.id_item         = M.fk_id_item
     LEFT JOIN Localizacao LO ON LO.id_local       = M.fk_id_local_origem
     INNER JOIN Localizacao LD ON LD.id_local      = M.fk_id_local_destino
     INNER JOIN Dispositivo D  ON D.id_dispositivo = M.fk_id_dispositivo
     ORDER BY M.movido_em DESC, M.id_movimento DESC`
  );
}

async function findOne(id: number): Promise<IMovimentoFindAll | undefined> {
  const rows = await query<IMovimentoFindAll>(
    `SELECT
       M.*,
       I.nome  AS item,
       LO.nome AS local_origem,
       LD.nome AS local_destino,
       D.nome  AS dispositivo
     FROM ${TABLE} M
     LEFT JOIN Item        I  ON I.id_item         = M.fk_id_item
     LEFT JOIN Localizacao LO ON LO.id_local       = M.fk_id_local_origem
     INNER JOIN Localizacao LD ON LD.id_local      = M.fk_id_local_destino
     INNER JOIN Dispositivo D  ON D.id_dispositivo = M.fk_id_dispositivo
     WHERE M.id_movimento = ?
     LIMIT 1`,
    [id]
  );
  return rows[0];
}

async function update(id: number, data: Partial<IMovimentoCreateEdit>) {
  const sets: string[] = [];
  const params: any[] = [];

  if (data.movido_em !== undefined)          { sets.push('movido_em = ?');           params.push(data.movido_em); }
  if (data.observacoes !== undefined)        { sets.push('observacoes = ?');         params.push(data.observacoes ?? null); }
  if (data.fk_id_item !== undefined)         { sets.push('fk_id_item = ?');          params.push(data.fk_id_item); }
  if (data.fk_id_local_origem !== undefined) { sets.push('fk_id_local_origem = ?');  params.push(data.fk_id_local_origem ?? null); }
  if (data.fk_id_local_destino !== undefined){ sets.push('fk_id_local_destino = ?'); params.push(data.fk_id_local_destino); }
  if (data.fk_id_dispositivo !== undefined)  { sets.push('fk_id_dispositivo = ?');   params.push(data.fk_id_dispositivo); }

  if (!sets.length) return findOne(id);

  params.push(id);
  await exec(`UPDATE ${TABLE} SET ${sets.join(', ')} WHERE id_movimento = ?`, params);
  return findOne(id);
}

async function remove(id: number) {
  await exec(`DELETE FROM ${TABLE} WHERE id_movimento = ?`, [id]);
  return { ok: true };
}

export const movimentoSql = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
