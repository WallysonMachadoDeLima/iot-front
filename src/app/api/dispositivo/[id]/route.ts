import { NextRequest, NextResponse } from 'next/server';
import { dispositivoSql } from '@/db/sql';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (id) {
            const result = await dispositivoSql.findOne(Number(id));
            return NextResponse.json(result);
        }

        const result = await dispositivoSql.findAll();
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('[DISPOSITIVO_GET]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await dispositivoSql.create(body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('[DISPOSITIVO_POST]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

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

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

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