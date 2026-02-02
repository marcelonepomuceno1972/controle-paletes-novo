"use client";

import { useState } from "react";

export default function RetornoLojaPage() {
  const [qtd, setQtd] = useState("");

  async function salvar() {
    await fetch("/api/retorno-loja", {
      method: "POST",
      body: JSON.stringify({ quantidade: Number(qtd) }),
    });
    alert("Retorno registrado");
    setQtd("");
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="font-bold text-xl mb-4">Retorno de Loja</h2>
      <input
        type="number"
        value={qtd}
        onChange={(e) => setQtd(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Quantidade"
      />
      <button onClick={salvar} className="bg-purple-600 text-white p-2 w-full rounded">
        Salvar
      </button>
    </div>
  );
}
