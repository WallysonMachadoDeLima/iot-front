"use client";

import { api } from '@/services';

interface ILeitura {
    id_leitura: number;
    tag_codigo: string;
    lido_em: string;
    rssi?: number;
    payload_json?: string;
    fk_id_dispositivo: number;
}

async function findAll(): Promise<ILeitura[]> {
    const { data } = await api.next.get<ILeitura[]>('/leitura');
    return data;
}

async function getLastReading(): Promise<ILeitura | null> {
    const leituras = await findAll();
    return leituras.length > 0 ? leituras[0] : null;
}

export const leituraService = {
    findAll,
    getLastReading,
};
