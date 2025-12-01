import { dispositivoSql } from '@/db/sql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({ error: 'ID não informado' }, { status: 400 });
        }

        const result = await dispositivoSql.findOne(Number(id));

        if (!result) {
            return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('[DISPOSITIVO_GET]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const result = await dispositivoSql.create(body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('[DISPOSITIVO_POST]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({ error: 'ID não informado' }, { status: 400 });
        }

        const body = await req.json();
        const result = await dispositivoSql.update(Number(id), body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('[DISPOSITIVO_PUT]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({ error: 'ID não informado' }, { status: 400 });
        }

        const result = await dispositivoSql.remove(Number(id));
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('[DISPOSITIVO_DELETE]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}