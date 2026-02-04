export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const result = await client.query(
      'SELECT codigo, nome FROM "Loja" ORDER BY codigo'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("ERRO API LOJAS:", error);
    return NextResponse.json([], { status: 200 });
  } finally {
    await client.end();
  }
}
