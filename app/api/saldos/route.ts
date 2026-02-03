import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    LOGISTICA_REVERSA: {
      PBR: 0,
      CHEP: 0,
      DESCARTAVEL: 0,
      GAIOLA: 0,
    },
  });
}
