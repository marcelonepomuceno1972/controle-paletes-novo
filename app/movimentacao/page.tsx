"use client";

import { useState } from "react";
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

        <h1 className="text-2xl font-bold text-center">
          MOVIMENTAÇÃO DE PALETES
        </h1>

        <div>
          <label className="block text-sm font-semibold mb-1">ORIGEM</label>
          <select
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="">Selecione</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">DESTINO</label>
          <select
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="">Selecione</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">MATERIAL</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="">Selecione</option>
            {MATERIAIS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">QUANTIDADE</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="w-full border rounded-xl p-3"
          />
        </div>

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

        <button
          onClick={salvar}
          className="w-full py-3 rounded-xl bg-green-700 text-white font-bold"
        >
          REGISTRAR MOVIMENTAÇÃO
        </button>

        <Link href="/" className="block text-center text-sm text-gray-600">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}