'use client';

import { ISalaCreateEdit } from '@/models';
import { api } from '@/services';

// ----------------------------------------------------------------------

async function create(payload: ISalaCreateEdit): Promise<ISalaCreateEdit> {
    const { data } = await api.next.post<ISalaCreateEdit>('/sala', payload);
    return data;
}

async function findAll(): Promise<ISalaCreateEdit[]> {
    const { data } = await api.next.get<ISalaCreateEdit[]>('/sala');
    return data;
}

async function findOneById(id: number): Promise<ISalaCreateEdit> {
    const { data } = await api.next.get<ISalaCreateEdit>(`/sala/${id}`);
    return data;
}


async function update(id: number, payload: ISalaCreateEdit): Promise<ISalaCreateEdit> {
    const { data } = await api.next.put<ISalaCreateEdit>(`/sala/${id}`, payload);
    return data;
}

async function remove(id: number): Promise<{ ok: true }> {
    const { data } = await api.next.delete<{ ok: true }>(`/sala/${id}`);
    return data;
}

export const salaService = {
    findAll,
    findOneById,
    create,
    update,
    remove,
};
