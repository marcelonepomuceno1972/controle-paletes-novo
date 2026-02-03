"use client";

export default function DashboardPage() {
  const areas = [
    "LOGISTICA REVERSA",
    "PRODUÇÃO",
    "FLV",
    "MERCEARIA",
    "FRIGORIFICO",
    "PERECIVEL",
  ];

  return (
    <div className="min-h-screen px-10 py-10">
      <div className="flex justify-center mb-8">
        <img src="/logo-oba.png" className="h-14" />
      </div>

      <h1 className="text-2xl font-bold text-center text-[var(--oba-green)] mb-10">
        DASHBOARD — SALDOS POR ÁREA
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {areas.map((area) => (
          <div
            key={area}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="font-bold text-lg mb-2">{area}</h2>
            <p className="text-gray-500">
              Nenhuma movimentação registrada
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a href="/" className="text-[var(--oba-orange)] font-semibold">
          VOLTAR AO INÍCIO
        </a>
      </div>
    </div>
  );
}