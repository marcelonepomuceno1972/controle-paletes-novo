export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { area: "LOGISTICA REVERSA", saldo: 0, farol: null },
    { area: "PRODUÇÃO", saldo: 0, farol: null },
    { area: "FLV", saldo: 0, farol: null },
    { area: "MERCEARIA", saldo: 0, farol: null },
    { area: "FRIGORIFICO", saldo: 0, farol: null },
    { area: "PERECIVEL", saldo: 0, farol: null },
  ]);
}
