import { exec, query } from '@/db/db';
import { ILeituraCreateEdit } from '@/models';

const TABLE = 'Leitura';

async function create(data: ILeituraCreateEdit) {
    const res = await exec(
        `INSERT INTO ${TABLE} (tag_codigo, lido_em, rssi, payload_json, fk_id_dispositivo) VALUES (?,?,?,?,?)`,
        [data.tag_codigo, data.lido_em, data.rssi, data.payload_json, data.fk_id_dispositivo]
    );
    return { id: res.insertId };
}

async function findAll() {
    return query(
        `SELECT * FROM ${TABLE} ORDER BY id_leitura DESC`
    );
}

export const leituraSql = {
    create,
    findAll,
};
