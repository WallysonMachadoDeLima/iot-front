import { atualizarSala, excluirSala, obterSala } from '@/db/sql/sala-sql';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Params = { params: { id_aluno: string } };

export async function GET(_req: Request, { params }: Params) {
    const id = Number(params.id_aluno);
    const item = await obterSala(id);
    if (!item) return NextResponse.json({ message: 'Não encontrado' }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: Params) {
    const id = Number(params.id_aluno);
    const body = await req.json();
    const updated = await atualizarSala(id, body);
    return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: Params) {
    const id = Number(params.id_aluno);
    await excluirSala(id);
    return NextResponse.json({ ok: true });
}
