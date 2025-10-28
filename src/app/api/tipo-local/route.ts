import { tipoLocalSql } from '@/db/sql/tipo-local-sql';
import { findFirstKeyWithValue } from '@/utils';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    const data = await tipoLocalSql.findAll();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const error = findFirstKeyWithValue(body);

    if (findFirstKeyWithValue(body)) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

    const created = await tipoLocalSql.create({ descricao: body.descricao });
    return NextResponse.json(created, { status: 201 });
}
