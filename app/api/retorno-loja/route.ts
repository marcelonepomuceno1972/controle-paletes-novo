import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { quantidade, tipoPalete, observacoes } = body;

  if (!quantidade || quantidade <= 0) {
    return NextResponse.json(
      { error: "Quantidade inválida" },
      { status: 400 }
    );
  }

  await prisma.Movimentacao.create({
    data: {
      tipoOperacao: "RETORNO",
      areaDestino: "LOGISTICA REVERSA",
      tipoPalete: tipoPalete ?? "PBR",
      quantidade,
      observacoes: observacoes ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
