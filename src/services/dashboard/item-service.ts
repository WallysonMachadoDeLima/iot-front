
"use client";

import { IItemCreateEdit, IItemFindAll } from '@/models';
import { api } from '@/services';

async function create(payload: IItemCreateEdit): Promise<IItemCreateEdit> {
    const { data } = await api.next.post<IItemCreateEdit>('/item', payload);
    return data;
}

async function findAll(): Promise<IItemFindAll[]> {
    const { data } = await api.next.get<IItemFindAll[]>('/item');
    return data;
}

async function findOneById(id: number): Promise<IItemFindAll> {
    const { data } = await api.next.get<IItemFindAll>(`/item/${id}`);
    return data;
}

async function update(id: number, payload: IItemCreateEdit): Promise<IItemCreateEdit> {
    const { data } = await api.next.put<IItemCreateEdit>(`/item/${id}`, payload);
    return data;
}

async function remove(id: number): Promise<{ ok: true }> {
    const { data } = await api.next.delete<{ ok: true }>(`/item/${id}`);
    return data;
}

export const itemService = {
    findAll,
    findOneById,
    create,
    update,
    remove,
};
