export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const lista = await prisma.fornecedor.findMany({
    orderBy: { nome: "asc" },
  });

  return NextResponse.json(lista);
}

export async function POST(req: Request) {
  const { nome } = await req.json();

  if (!nome || nome.trim() === "") {
    return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
  }

  await prisma.fornecedor.upsert({
    where: { nome },
    update: {},
    create: { nome },
  });

  return NextResponse.json({ ok: true });
}