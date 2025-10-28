import { tipoLocalSql } from '@/db/sql/tipo-local-sql';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
    const id = Number(params.id);
    const item = await tipoLocalSql.findOne(id);

    if (!item) return NextResponse.json({ message: 'Não encontrado' }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: Params) {
    const id = Number(params.id);
    const body = await req.json();
    const updated = await tipoLocalSql.update(id, body);
    return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: Params) {
    const id = Number(params.id);
    await tipoLocalSql.remove(id);
    return NextResponse.json({ ok: true });
}
