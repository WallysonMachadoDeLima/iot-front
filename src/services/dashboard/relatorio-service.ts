"use client";

import { IItemAtualPorSala, IMovimentacaoPorItem, IResumoSalaAtual } from '@/models';
import { api } from '@/services';

async function getResumoAtualPorSala(): Promise<IResumoSalaAtual[]> {
    const { data } = await api.next.get<IResumoSalaAtual[]>('/relatorio/resumo-atual-por-sala');
    return data;
}

async function getItensAtuaisPorSala(idSala?: number): Promise<IItemAtualPorSala[]> {
    const url = idSala
        ? `/relatorio/itens-atuais-por-sala?id_sala=${idSala}`
        : '/relatorio/itens-atuais-por-sala';
    const { data } = await api.next.get<IItemAtualPorSala[]>(url);
    return data;
}

async function getMovimentacaoPorItens(params?: {
    dataInicio?: string;
    dataFim?: string;
    tagCodigo?: string;
}): Promise<IMovimentacaoPorItem[]> {
    const queryParams = new URLSearchParams();
    if (params?.dataInicio) queryParams.append('dataInicio', params.dataInicio);
    if (params?.dataFim) queryParams.append('dataFim', params.dataFim);
    if (params?.tagCodigo) queryParams.append('tagCodigo', params.tagCodigo);

    const url = `/relatorio/movimentacao-por-itens${queryParams.toString() ? `?${queryParams}` : ''}`;
    const { data } = await api.next.get<IMovimentacaoPorItem[]>(url);
    return data;
}

export const relatorioService = {
    getResumoAtualPorSala,
    getItensAtuaisPorSala,
    getMovimentacaoPorItens,
};
