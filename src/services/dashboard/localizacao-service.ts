"use client";

import { ILocalizacaoCreateEdit, ILocalizacaoFindAll } from '@/models';
import { api } from '@/services';

async function create(payload: ILocalizacaoCreateEdit): Promise<ILocalizacaoCreateEdit> {
    const { data } = await api.next.post<ILocalizacaoCreateEdit>('/localizacao', payload);
    return data;
}

async function findAll(): Promise<ILocalizacaoFindAll[]> {
    const { data } = await api.next.get<ILocalizacaoFindAll[]>('/localizacao');
    return data;
}

async function findOneById(id: number): Promise<ILocalizacaoFindAll> {
    const { data } = await api.next.get<ILocalizacaoFindAll>(`/localizacao/${id}`);
    return data;
}

async function update(id: number, payload: ILocalizacaoCreateEdit): Promise<ILocalizacaoCreateEdit> {
    const { data } = await api.next.put<ILocalizacaoCreateEdit>(`/localizacao/${id}`, payload);
    return data;
}

async function remove(id: number): Promise<{ ok: true }> {
    const { data } = await api.next.delete<{ ok: true }>(`/localizacao/${id}`);
    return data;
}

export const localizacaoService = {
    findAll,
    findOneById,
    create,
    update,
    remove,
};
