"use client";

import { useState } from "react";

export default function EntradaPage() {
  const [qtd, setQtd] = useState("");

  async function salvar() {
    await fetch("/api/entrada", {
      method: "POST",
      body: JSON.stringify({ quantidade: Number(qtd) }),
    });
    alert("Entrada registrada");
    setQtd("");
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="font-bold text-xl mb-4">Entrada</h2>
      <input
        type="number"
        value={qtd}
        onChange={(e) => setQtd(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Quantidade"
      />
      <button onClick={salvar} className="bg-blue-600 text-white p-2 w-full rounded">
        Salvar
      </button>
    </div>
  );
}
