import { movimentoSql } from '@/db/sql/movimento-sql';
import { findFirstKeyWithValue } from '@/utils';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    const data = await movimentoSql.findAll();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const error = findFirstKeyWithValue(body);

  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const created = await movimentoSql.create({
    movido_em: body.movido_em,
    observacoes: body.observacoes,
    fk_id_item: body.fk_id_item,
    fk_id_local_origem: body.fk_id_local_origem ?? null,
    fk_id_local_destino: body.fk_id_local_destino,
    fk_id_dispositivo: body.fk_id_dispositivo,
  });

  return NextResponse.json(created, { status: 201 });
}

