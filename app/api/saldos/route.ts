import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { area: "LOGISTICA REVERSA", total: 1200 },
    { area: "PRODUCAO", total: 800 },
    { area: "FLV", total: 500 },
  ]);
}
