"use client";

import { useState } from "react";

export default function SaidaPage() {
  const [qtd, setQtd] = useState("");

  async function salvar() {
    await fetch("/api/saida", {
      method: "POST",
      body: JSON.stringify({ quantidade: Number(qtd) }),
    });
    alert("Saída registrada");
    setQtd("");
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="font-bold text-xl mb-4">Saída</h2>
      <input
        type="number"
        value={qtd}
        onChange={(e) => setQtd(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Quantidade"
      />
      <button onClick={salvar} className="bg-green-600 text-white p-2 w-full rounded">
        Salvar
      </button>
    </div>
  );
}
