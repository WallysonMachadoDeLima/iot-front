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
        `SELECT 
            L.id_leitura,
            L.tag_codigo,
            L.lido_em,
            L.rssi,
            L.payload_json,
            L.fk_id_dispositivo,
            D.identificador AS dispositivo,
            I.nome AS item
         FROM ${TABLE} L
         LEFT JOIN Dispositivo D ON L.fk_id_dispositivo = D.id_dispositivo
         LEFT JOIN Item I ON L.tag_codigo = I.tag_codigo
         ORDER BY L.id_leitura DESC`
    );
}

export const leituraSql = {
    create,
    findAll,
};
