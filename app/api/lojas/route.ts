import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const lojas = await prisma.Loja.findMany({
    orderBy: { nome: "asc" },
  });

  return NextResponse.json(lojas);
}
