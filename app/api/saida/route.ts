export async function GET() {
  return new Response("API OK");
}
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { tipoPalete, quantidade } = body;

  const saldoAtual = await prisma.Movimentacao.findMany({
    where: {
      OR: [
        { areaDestino: "LOGISTICA REVERSA", tipoPalete },
        { areaOrigem: "LOGISTICA REVERSA", tipoPalete },
      ],
    },
  });

  const saldo = (saldoAtual ?? []).reduce((acc, mov) => {
  if (mov.areaDestino === "LOGISTICA REVERSA") return acc + mov.quantidade;
  if (mov.areaOrigem === "LOGISTICA REVERSA") return acc - mov.quantidade;
  return acc;
}, 0);

  if (saldo < quantidade) {
    return NextResponse.json(
      { error: "Saldo insuficiente na LOGISTICA REVERSA" },
      { status: 400 }
    );
  }

  // segue criação da movimentação aqui...
}
