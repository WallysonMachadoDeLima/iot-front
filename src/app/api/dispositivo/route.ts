
import { dispositivoSql } from '@/db/sql';
import { findFirstKeyWithValue } from '@/utils';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    const data = await dispositivoSql.findAll();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const error = findFirstKeyWithValue(body);

    if (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
    const created = await dispositivoSql.create({
        identificador: body.identificador,
        descricao: body.descricao,
        tipo: body.tipo,
        ativo: body.ativo,
        fk_id_local: body.fk_id_local,
        fk_id_tipolocal: body.fk_id_tipolocal,
        criado_em: new Date(),
    });
    return NextResponse.json(created, { status: 201 });
}
