'use client';

import { ITipoLocalCreateEdit } from '@/models';
import { api } from '@/services';



async function create(payload: ITipoLocalCreateEdit): Promise<ITipoLocalCreateEdit> {
    const { data } = await api.next.post<ITipoLocalCreateEdit>('/tipo-local', payload);
    return data;
}

async function findAll(): Promise<ITipoLocalCreateEdit[]> {
    const { data } = await api.next.get<ITipoLocalCreateEdit[]>('/tipo-local');
    return data;
}

async function findOneById(id: number): Promise<ITipoLocalCreateEdit> {
    const { data } = await api.next.get<ITipoLocalCreateEdit>(`/tipo-local/${id}`);
    return data;
}


async function update(id: number, payload: ITipoLocalCreateEdit): Promise<ITipoLocalCreateEdit> {
    const { data } = await api.next.put<ITipoLocalCreateEdit>(`/tipo-local/${id}`, payload);
    return data;
}

async function remove(id: number): Promise<{ ok: true }> {
    const { data } = await api.next.delete<{ ok: true }>(`/tipo-local/${id}`);
    return data;
}

export const tipoLocalService = {
    findAll,
    findOneById,
    create,
    update,
    remove,
};
