"use client";

import { ILeituraCreateEdit, ILeituraFindAll } from '@/models';
import { api } from '@/services';

async function create(payload: ILeituraCreateEdit): Promise<ILeituraCreateEdit> {
    const { data } = await api.next.post<ILeituraCreateEdit>('/leitura', payload);
    return data;
}

async function findAll(): Promise<ILeituraFindAll[]> {
    const { data } = await api.next.get<ILeituraFindAll[]>('/leitura');
    return data;
}

async function findOneById(id: number): Promise<ILeituraFindAll> {
    const { data } = await api.next.get<ILeituraFindAll>(`/leitura/${id}`);
    return data;
}

async function update(id: number, payload: ILeituraCreateEdit): Promise<ILeituraCreateEdit> {
    const { data } = await api.next.put<ILeituraCreateEdit>(`/leitura/${id}`, payload);
    return data;
}

async function remove(id: number): Promise<{ ok: true }> {
    const { data } = await api.next.delete<{ ok: true }>(`/leitura/${id}`);
    return data;
}

async function getLastReading(): Promise<ILeituraFindAll | null> {
    const leituras = await findAll();
    return leituras.length > 0 ? leituras[0] : null;
}

export const leituraService = {
    findAll,
    findOneById,
    create,
    update,
    remove,
    getLastReading,
};
