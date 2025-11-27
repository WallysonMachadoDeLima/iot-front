import { query } from '@/db/db';
import { IItemAtualPorSala, IMovimentacaoPorItem, IResumoSalaAtual } from '@/models';

// Resumo por sala (situação atual)
async function getResumoAtualPorSala(): Promise<IResumoSalaAtual[]> {
    return query<IResumoSalaAtual>(
        `SELECT * FROM v_resumo_atual_por_sala`
    );
}

// Itens atuais por sala
async function getItensAtuaisPorSala(idSala?: number): Promise<IItemAtualPorSala[]> {
    if (idSala) {
        return query<IItemAtualPorSala>(
            `SELECT * FROM v_itens_atuais_por_sala WHERE id_sala = ?`,
            [idSala]
        );
    }
    return query<IItemAtualPorSala>(
        `SELECT * FROM v_itens_atuais_por_sala`
    );
}

// Movimentação por itens
async function getMovimentacaoPorItens(params?: {
    dataInicio?: string;
    dataFim?: string;
    tagCodigo?: string;
}): Promise<IMovimentacaoPorItem[]> {
    let sql = `SELECT * FROM v_movimentacao_por_itens WHERE 1=1`;
    const queryParams: any[] = [];

    if (params?.dataInicio && params?.dataFim) {
        sql += ` AND movido_em BETWEEN ? AND ?`;
        queryParams.push(params.dataInicio, params.dataFim);
    }

    if (params?.tagCodigo) {
        sql += ` AND tag_codigo = ?`;
        queryParams.push(params.tagCodigo);
    }

    sql += ` ORDER BY movido_em DESC`;

    return query<IMovimentacaoPorItem>(sql, queryParams);
}

export const relatorioSql = {
    getResumoAtualPorSala,
    getItensAtuaisPorSala,
    getMovimentacaoPorItens,
};
