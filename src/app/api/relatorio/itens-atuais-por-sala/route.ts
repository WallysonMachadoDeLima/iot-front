import { relatorioSql } from '@/db/sql/relatorio-sql';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const idSala = searchParams.get('id_sala');

    const data = await relatorioSql.getItensAtuaisPorSala(
        idSala ? Number(idSala) : undefined
    );

    return NextResponse.json(data);
}
