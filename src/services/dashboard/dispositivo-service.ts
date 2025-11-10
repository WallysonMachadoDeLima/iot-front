"use client";

import { IDispositivoCreateEdit, IDispositivoFindAll } from '@/models';
import { api } from '@/services';

async function create(payload: IDispositivoCreateEdit): Promise<IDispositivoCreateEdit> {
    const { data } = await api.next.post<IDispositivoCreateEdit>('/dispositivo', payload);
    return data;
}

async function findAll(): Promise<IDispositivoFindAll[]> {
    const { data } = await api.next.get<IDispositivoFindAll[]>('/dispositivo');
    return data;
}

async function findOneById(id: number): Promise<IDispositivoFindAll> {
    const { data } = await api.next.get<IDispositivoFindAll>(`/dispositivo/${id}`);
    return data;
}

async function update(id: number, payload: IDispositivoCreateEdit): Promise<IDispositivoCreateEdit> {
    const { data } = await api.next.put<IDispositivoCreateEdit>(`/dispositivo/${id}`, payload);
    return data;
}

async function remove(id: number): Promise<{ ok: true }> {
    const { data } = await api.next.delete<{ ok: true }>(`/dispositivo/${id}`);
    return data;
}

export const dispositivoService = {
    findAll,
    findOneById,
    create,
    update,
    remove,
};