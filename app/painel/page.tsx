import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const AREAS = [
  "LOGISTICA REVERSA",
  "PRODUÇÃO",
  "FLV",
  "MERCEARIA",
  "FRIGORIFICO",
  "PERECIVEL",
];

/* 🚦 REGRA DO FAROL */
function farol(valor: number) {
  if (valor <= 600) {
    return {
      label: "CRÍTICO",
      text: "text-red-700",
      bg: "bg-red-100",
      dot: "bg-red-600",
    };
  }

  if (valor <= 1100) {
    return {
      label: "ATENÇÃO",
      text: "text-yellow-800",
      bg: "bg-yellow-100",
      dot: "bg-yellow-500",
    };
  }

  return {
    label: "SAUDÁVEL",
    text: "text-green-700",
    bg: "bg-green-100",
    dot: "bg-green-600",
  };
}

export default async function Painel() {
  const movimentacoes = await prisma.movimentacao.findMany({
    orderBy: { createdAt: "desc" },
  });

  const saldo: Record<string, number> = {};
  AREAS.forEach((a) => (saldo[a] = 0));

  movimentacoes.forEach((m) => {
    if (m.areaDestino) saldo[m.areaDestino] += m.quantidade;
    if (m.areaOrigem) saldo[m.areaOrigem] -= m.quantidade;
  });

  const saldoLogistica = saldo["LOGISTICA REVERSA"];
  const status = farol(saldoLogistica);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* TOPO */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            DASHBOARD — CONTROLE DE PALETES
          </h1>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-gray-800 text-white font-semibold"
          >
            VOLTAR AO INÍCIO
          </Link>
        </div>

        {/* CARDS DE ÁREA */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AREAS.map((area) => {
            const isLogistica = area === "LOGISTICA REVERSA";

            return (
              <div
                key={area}
                className={`rounded-2xl shadow p-6 ${
                  isLogistica ? status.bg : "bg-white"
                }`}
              >
                <p className="text-sm text-gray-500">ÁREA</p>
                <h2 className="text-lg font-bold">{area}</h2>

                <p className="text-4xl font-bold mt-2">
                  {saldo[area]}
                </p>

                {/* 🚦 FAROL — SOMENTE LOGÍSTICA REVERSA */}
                {isLogistica && (
                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${status.dot}`}
                    />
                    <span
                      className={`font-semibold ${status.text}`}
                    >
                      {status.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* MOVIMENTAÇÕES */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold mb-4">
            MOVIMENTAÇÕES RECENTES
          </h2>

          <div className="max-h-96 overflow-y-auto space-y-2 text-sm">
            {movimentacoes.map((m) => (
              <div
                key={m.id}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <strong>{m.tipoOperacao}</strong> — {m.tipoPalete}
                  <div className="text-gray-500">
                    {m.areaOrigem ?? "-"} → {m.areaDestino ?? "-"}
                  </div>
                  {m.fornecedor && (
                    <div className="text-gray-400">
                      Fornecedor: {m.fornecedor}
                    </div>
                  )}
                </div>

                <div className="font-bold">
                  {m.quantidade}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}