"use client";

import { useState } from "react";
import CampoSelect from "@/app/components/CampoSelect";
import CampoNumero from "@/app/components/CampoNumero";
import Link from "next/link";

const AREAS = [
  "LOGISTICA REVERSA",
  "PRODUÇÃO",
  "FLV",
  "MERCEARIA",
  "FRIGORIFICO",
  "PERECIVEL",
];

const MATERIAIS = ["PBR", "DESCARTAVEL", "CHEP", "GAIOLA"];

export default function MovimentacaoPage() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [material, setMaterial] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  async function salvar() {
    await fetch("/api/movimentacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        areaOrigem: origem,
        areaDestino: destino,
        tipoPalete: material,
        quantidade: Number(quantidade),
        observacoes,
      }),
    });

    alert("MOVIMENTAÇÃO REGISTRADA");
    setOrigem("");
    setDestino("");
    setMaterial("");
    setQuantidade("");
    setObservacoes("");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-slate-100">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 space-y-6">

        {/* LOGO */}
        <div className="flex justify-center">
          <img src="/logo-oba.png" alt="Logo" className="h-14" />
        </div>

        <h1 className="text-2xl font-bold text-center text-green-700">
          MOVIMENTAÇÃO DE PALETES
        </h1>

        {/* CAMPOS */}
        <CampoSelect
          label="ORIGEM"
          value={origem}
          setValue={setOrigem}
          lista={AREAS}
        />

        <CampoSelect
          label="DESTINO"
          value={destino}
          setValue={setDestino}
          lista={AREAS}
        />

        <CampoSelect
          label="MATERIAL"
          value={material}
          setValue={setMaterial}
          lista={MATERIAIS}
        />

        <CampoNumero
          label="QUANTIDADE"
          value={quantidade}
          setValue={setQuantidade}
        />

        {/* OBSERVAÇÕES (nativo, sem componente externo) */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            OBSERVAÇÕES
          </label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full border rounded-xl p-3"
            rows={3}
          />
        </div>

        {/* BOTÕES */}
        <button
          onClick={salvar}
          className="w-full py-3 rounded-xl bg-green-700 text-white font-bold hover:opacity-90 transition"
        >
          REGISTRAR MOVIMENTAÇÃO
        </button>

        <Link
          href="/"
          className="block text-center text-sm text-gray-600 hover:underline"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}