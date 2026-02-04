export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const lojas = await prisma.loja.findMany({
      orderBy: { nome: "asc" },
    });
    return NextResponse.json(lojas);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}
