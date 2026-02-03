import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    areaOrigem,
    areaDestino,
    tipoPalete,
    quantidade,
    observacoes,
  } = body;

  if (!areaOrigem || !areaDestino || !tipoPalete || !quantidade) {
    return NextResponse.json(
      { error: "DADOS OBRIGATÓRIOS AUSENTES" },
      { status: 400 }
    );
  }

  // Validação de saldo da origem
  const movimentos = await prisma.movimentacao.findMany({
    where: {
      OR: [
        { areaDestino: areaOrigem, tipoPalete },
        { areaOrigem: areaOrigem, tipoPalete },
      ],
    },
  });

  const saldo = movimentos.reduce((acc, mov) => {
    if (mov.areaDestino === areaOrigem) return acc + mov.quantidade;
    if (mov.areaOrigem === areaOrigem) return acc - mov.quantidade;
    return acc;
  }, 0);

  if (saldo < quantidade) {
    return NextResponse.json(
      { error: "SALDO INSUFICIENTE NA ÁREA DE ORIGEM" },
      { status: 400 }
    );
  }

  await prisma.movimentacao.create({
    data: {
      tipoOperacao: "MOVIMENTACAO",
      areaOrigem,
      areaDestino,
      tipoPalete,
      quantidade,
      observacoes,
    },
  });

  return NextResponse.json({ ok: true });
}
