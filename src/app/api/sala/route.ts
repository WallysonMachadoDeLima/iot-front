import { criarSala, listarSalas } from '@/db/sql';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    const data = await listarSalas();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    if (!body?.nome || !body?.descricao) {
        return NextResponse.json({ message: 'nome e descricao são obrigatórios' }, { status: 400 });
    }
    const created = await criarSala({ nome: body.nome, descricao: body.descricao });
    return NextResponse.json(created, { status: 201 });
}
