import { localizacaoSql } from '@/db/sql/localizacao-sql';
import { findFirstKeyWithValue } from '@/utils';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    const data = await localizacaoSql.findAll();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const error = findFirstKeyWithValue(body);

    if (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

    const created = await localizacaoSql.create({ fk_id_tipolocal: body.fk_id_tipolocal, nome: body.nome, ativo: body.ativo });
    return NextResponse.json(created, { status: 201 });
}
