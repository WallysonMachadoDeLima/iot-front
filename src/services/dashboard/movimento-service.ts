"use client";

import { IMovimentoCreateEdit, IMovimentoFindAll } from '@/models';
import { api } from '@/services';

async function create(payload: IMovimentoCreateEdit): Promise<IMovimentoCreateEdit> {
    const { data } = await api.next.post<IMovimentoCreateEdit>('/movimento', payload);
    return data;
}

async function findAll(): Promise<IMovimentoFindAll[]> {
    const { data } = await api.next.get<IMovimentoFindAll[]>('/movimento');
    return data;
}

async function findOneById(id: number): Promise<IMovimentoFindAll> {
    const { data } = await api.next.get<IMovimentoFindAll>(`/movimento/${id}`);
    return data;
}

async function update(id: number, payload: IMovimentoCreateEdit): Promise<IMovimentoCreateEdit> {
    const { data } = await api.next.put<IMovimentoCreateEdit>(`/movimento/${id}`, payload);
    return data;
}

async function remove(id: number): Promise<{ ok: true }> {
    const { data } = await api.next.delete<{ ok: true }>(`/movimento/${id}`);
    return data;
}

export const movimentoService = {
    findAll,
    findOneById,
    create,
    update,
    remove,
};
