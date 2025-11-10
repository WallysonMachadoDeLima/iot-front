
import { itemSql } from '@/db/sql/item-sql';
import { findFirstKeyWithValue } from '@/utils';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    const data = await itemSql.findAll();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const error = findFirstKeyWithValue(body);

    if (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

    const created = await itemSql.create({ 
        tag_codigo: body.tag_codigo,
        nome: body.nome,
        descricao: body.descricao,
        ativo: body.ativo,
        fk_id_local_origem: body.fk_id_local_origem,
    });
    return NextResponse.json(created, { status: 201 });
}
