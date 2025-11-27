import { relatorioSql } from '@/db/sql/relatorio-sql';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const dataInicio = searchParams.get('dataInicio') || undefined;
    const dataFim = searchParams.get('dataFim') || undefined;
    const tagCodigo = searchParams.get('tagCodigo') || undefined;

    const data = await relatorioSql.getMovimentacaoPorItens({
        dataInicio,
        dataFim,
        tagCodigo,
    });

    return NextResponse.json(data);
}
