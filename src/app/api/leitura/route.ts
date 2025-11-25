import { leituraSql } from '@/db/sql/leitura-sql';
import { findFirstKeyWithValue } from '@/utils';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    const data = await leituraSql.findAll();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const error = findFirstKeyWithValue(body);

    if (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

    const created = await leituraSql.create({
        tag_codigo: body.tag_codigo,
        lido_em: body.lido_em,
        rssi: body.rssi,
        payload_json: body.payload_json,
        fk_id_dispositivo: body.fk_id_dispositivo,
    });

    return NextResponse.json(created, { status: 201 });
}
