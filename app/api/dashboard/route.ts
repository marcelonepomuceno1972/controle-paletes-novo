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
  try {
    const movimentacoes = await prisma.movimentacao.findMany();

    function calcularSaldo(area: string) {
      return movimentacoes.reduce((acc, mov) => {
        if (mov.destino === area) return acc + mov.quantidade;
        if (mov.origem === area) return acc - mov.quantidade;
        return acc;
      }, 0);
    }

    const saldos = AREAS.map((area) => {
      const saldo = calcularSaldo(area);

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
  } catch (error) {
    console.error("ERRO DASHBOARD:", error);
    return NextResponse.json([]);
  }
}
