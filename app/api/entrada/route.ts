import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { areaDestino, tipoPalete, quantidade, fornecedor, observacoes } = body;

  if (!areaDestino || !tipoPalete || !quantidade) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  await prisma.movimentacao.create({
    data: {
      tipoOperacao: "ENTRADA",
      areaOrigem: null,
      areaDestino,
      tipoPalete,
      quantidade,
      fornecedor: fornecedor || null,
      observacoes: observacoes || null,
    },
  });

  return NextResponse.json({ ok: true });
}