import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { areaDestino, tipoPalete, quantidade, observacoes } = body;

  if (!areaDestino || !tipoPalete || !quantidade) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  // valida saldo da LOGISTICA REVERSA
  const movimentos = await prisma.movimentacao.findMany({
    where: {
      OR: [
        { areaDestino: "LOGISTICA REVERSA", tipoPalete },
        { areaOrigem: "LOGISTICA REVERSA", tipoPalete },
      ],
    },
  });

  const saldo = movimentos.reduce((acc, mov) => {
    if (mov.areaDestino === "LOGISTICA REVERSA") return acc + mov.quantidade;
    if (mov.areaOrigem === "LOGISTICA REVERSA") return acc - mov.quantidade;
    return acc;
  }, 0);

  if (saldo < quantidade) {
    return NextResponse.json(
      { error: "Saldo insuficiente" },
      { status: 400 }
    );
  }

  await prisma.movimentacao.create({
    data: {
      tipoOperacao: "SAIDA",
      areaOrigem: "LOGISTICA REVERSA",
      areaDestino,
      tipoPalete,
      quantidade,
      observacoes: observacoes ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
