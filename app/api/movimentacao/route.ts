import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { areaOrigem, areaDestino, tipoPalete, quantidade } = body;

  if (!areaOrigem || !areaDestino || !tipoPalete || !quantidade) {
    return NextResponse.json(
      { error: "Dados inválidos" },
      { status: 400 }
    );
  }

  // valida saldo da origem
  const movimentos = await prisma.Movimentacao.findMany({
    where: {
      OR: [
        { areaDestino: areaOrigem, tipoPalete },
        { areaOrigem: areaOrigem, tipoPalete },
      ],
    },
  });

  const saldoOrigem = movimentos.reduce((acc, mov) => {
    if (mov.areaDestino === areaOrigem) return acc + mov.quantidade;
    if (mov.areaOrigem === areaOrigem) return acc - mov.quantidade;
    return acc;
  }, 0);

  if (saldoOrigem < quantidade) {
    return NextResponse.json(
      { error: "Saldo insuficiente na área de origem" },
      { status: 400 }
    );
  }

  await prisma.Movimentacao.create({
    data: {
      tipoOperacao: "MOVIMENTACAO",
      areaOrigem,
      areaDestino,
      tipoPalete,
      quantidade,
    },
  });

  return NextResponse.json({ ok: true });
}

