"use client";

import { useEffect, useState } from "react";

type SaldoTipos = {
  PBR: number;
  DESCARTAVEL: number;
  GAIOLA: number;
  CHEP: number;
};

type DashboardData = {
  saldoPorArea: Record<string, SaldoTipos>;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function carregar() {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      setData(json);
    }
    carregar();
  }, []);

  if (!data) {
    return <p className="p-6">Carregando...</p>;
  }

  const totalGeral = Object.values(data.saldoPorArea).reduce(
    (acc, area) =>
      acc +
      area.PBR +
      area.DESCARTAVEL +
      area.GAIOLA +
      area.CHEP,
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard — Saldos por Área
        </h1>
        <p className="text-gray-600">Total geral: {totalGeral}</p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data.saldoPorArea).map(([area, tipos]) => {
          const total =
            tipos.PBR +
            tipos.DESCARTAVEL +
            tipos.GAIOLA +
            tipos.CHEP;

          return (
            <div
              key={area}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <p className="text-sm text-gray-500">Área</p>
              <p className="font-bold text-lg mb-2">{area}</p>

              <p className="text-4xl font-bold mb-4">{total}</p>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>DESCARTÁVEL</span>
                  <span>{tipos.DESCARTAVEL}</span>
                </div>
                <div className="flex justify-between">
                  <span>GAIOLA</span>
                  <span>{tipos.GAIOLA}</span>
                </div>
                <div className="flex justify-between">
                  <span>PBR</span>
                  <span>{tipos.PBR}</span>
                </div>
                <div className="flex justify-between">
                  <span>CHEP</span>
                  <span>{tipos.CHEP}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
