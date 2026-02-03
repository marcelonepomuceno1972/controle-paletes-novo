"use client";

import { useEffect, useState } from "react";

type Loja = {
  id: number;
  nome: string;
};

export default function RetornoLojaPage() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [lojaSelecionada, setLojaSelecionada] = useState("");
  const [quantidade, setQuantidade] = useState("");

  // Carregar lojas do banco
  useEffect(() => {
    async function carregarLojas() {
      const res = await fetch("/api/lojas");
      const data = await res.json();
      setLojas(data);
    }

    carregarLojas();
  }, []);

  async function salvar() {
    if (!lojaSelecionada) {
      alert("Selecione a loja");
      return;
    }

    if (!quantidade) {
      alert("Informe a quantidade");
      return;
    }

    await fetch("/api/retorno-loja", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loja: lojaSelecionada, // informativo
        quantidade: Number(quantidade),
        tipoPalete: "PBR",
      }),
    });

    alert("Retorno registrado com sucesso");
    setQuantidade("");
    setLojaSelecionada("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="font-bold text-xl mb-6 text-center">
          Retorno de Loja
        </h2>

        {/* Loja (Origem) */}
        <label className="block text-sm font-medium mb-1">
          Loja (Origem)
        </label>
        <select
          value={lojaSelecionada}
          onChange={(e) => setLojaSelecionada(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">Selecione a loja</option>
          {lojas.map((loja) => (
            <option key={loja.id} value={loja.nome}>
              {loja.nome}
            </option>
          ))}
        </select>

        {/* Destino fixo */}
        <label className="block text-sm font-medium mb-1">
          Destino
        </label>
        <input
          value="LOGISTICA REVERSA"
          disabled
          className="border p-2 w-full mb-4 bg-gray-100"
        />

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
          placeholder="Quantidade de paletes"
        />

        <button
          onClick={salvar}
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 w-full rounded"
        >
          Registrar Retorno
        </button>
      </div>
    </div>
  );
}
