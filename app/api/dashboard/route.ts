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

export async function GET() {
  const movimentacoes = await prisma.Movimentacao.findMany();

  function calcularSaldo(area: string) {
    return movimentacoes.reduce((acc, mov) => {
      if (mov.areaDestino === area) return acc + mov.quantidade;
      if (mov.areaOrigem === area) return acc - mov.quantidade;
      return acc;
    }, 0);
  }

  const saldos = AREAS.map((area) => {
    const saldo = calcularSaldo(area);

    // Farol só para Logística Reversa
    let farol = null;

    if (area === "LOGISTICA REVERSA") {
      if (saldo <= 600) {
        farol = { status: "CRITICO", cor: "red" };
      } else if (saldo <= 1100) {
        farol = { status: "ATENCAO", cor: "yellow" };
      } else {
        farol = { status: "SAUDAVEL", cor: "green" };
      }
    }

    return {
      area,
      saldo,
      farol,
    };
  });

  return NextResponse.json(saldos);
}
