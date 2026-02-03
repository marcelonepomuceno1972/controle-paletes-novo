import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

const AREAS = [
  "LOGISTICA REVERSA",
  "PRODUÇÃO",
  "FLV",
  "MERCEARIA",
  "FRIGORIFICO",
  "PERECIVEL",
];

const TIPOS = ["PBR", "DESCARTAVEL", "GAIOLA", "CHEP"];

export async function GET() {
  const movimentacoes = await prisma.Movimentacao.findMany();

  // inicializa todas as áreas com zero
  const saldoPorArea: Record<string, Record<string, number>> = {};

  AREAS.forEach((area) => {
    saldoPorArea[area] = {
      PBR: 0,
      DESCARTAVEL: 0,
      GAIOLA: 0,
      CHEP: 0,
    };
  });

  // aplica movimentações
  movimentacoes.forEach((mov) => {
    const { areaOrigem, areaDestino, tipoPalete, quantidade } = mov;

    if (areaDestino && saldoPorArea[areaDestino]) {
      saldoPorArea[areaDestino][tipoPalete] += quantidade;
    }

    if (areaOrigem && saldoPorArea[areaOrigem]) {
      saldoPorArea[areaOrigem][tipoPalete] -= quantidade;
    }
  });

  return NextResponse.json({ saldoPorArea });
}
