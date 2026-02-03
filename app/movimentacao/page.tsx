"use client";

import { useState } from "react";

const AREAS = [
  "LOGISTICA REVERSA",
  "PRODUÇÃO",
  "FLV",
  "MERCEARIA",
  "FRIGORIFICO",
  "PERECIVEL",
];

const TIPOS = ["PBR", "CHEP", "DESCARTAVEL", "GAIOLA"];

export default function MovimentacaoPage() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoPalete, setTipoPalete] = useState("");
  const [quantidade, setQuantidade] = useState("");

  async function salvar() {
    if (!origem || !destino || !tipoPalete || !quantidade) {
      alert("Preencha todos os campos");
      return;
    }

    if (origem === destino) {
      alert("Origem e destino não podem ser iguais");
      return;
    }

    await fetch("/api/movimentacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        areaOrigem: origem,
        areaDestino: destino,
        tipoPalete,
        quantidade: Number(quantidade),
      }),
    });

    alert("Movimentação registrada com sucesso");

    setOrigem("");
    setDestino("");
    setTipoPalete("");
    setQuantidade("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="font-bold text-xl mb-6 text-center">
          Movimentação de Paletes
        </h2>

        {/* Origem */}
        <label className="block text-sm font-medium mb-1">
          Área de Origem
        </label>
        <select
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">Selecione</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        {/* Destino */}
        <label className="block text-sm font-medium mb-1">
          Área de Destino
        </label>
        <select
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">Selecione</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        {/* Tipo */}
        <label className="block text-sm font-medium mb-1">
          Tipo de Palete
        </label>
        <select
          value={tipoPalete}
          onChange={(e) => setTipoPalete(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">Selecione</option>
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Quantidade */}
        <label className="block text-sm font-medium mb-1">
          Quantidade
        </label>
        <input
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="border p-2 w-full mb-6"
        />

        <button
          onClick={salvar}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded"
        >
          Registrar Movimentação
        </button>
      </div>
    </div>
  );
}
