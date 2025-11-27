import { relatorioSql } from '@/db/sql/relatorio-sql';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    const data = await relatorioSql.getResumoAtualPorSala();
    return NextResponse.json(data);
}
