"use client";

import { useEffect, useState } from "react";

type Loja = {
  id: number;
  nome: string;
};

const MATERIAIS = ["PBR", "DESCARTAVEL", "CHEP", "GAIOLA"];

export default function RetornoLojaPage() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loja, setLoja] = useState("");
  const [material, setMaterial] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    fetch("/api/lojas")
      .then((res) => res.json())
      .then(setLojas)
      .catch(() => alert("Erro ao carregar lojas"));
  }, []);

  async function salvar() {
    if (!loja || !material || !quantidade) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    await fetch("/api/retorno-loja", {
      method: "POST",
      body: JSON.stringify({
        loja,
        tipoPalete: material,
        quantidade: Number(quantidade),
        observacoes,
      }),
    });

    alert("RETORNO DE LOJA REGISTRADO COM SUCESSO");

    setLoja("");
    setMaterial("");
    setQuantidade("");
    setObservacoes("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-12">
        <div className="flex justify-center mb-6">
          <img src="/logo-oba.png" className="h-14" />
        </div>

        <h1 className="text-2xl font-bold text-center text-[var(--oba-green)] mb-8">
          RETORNO DE LOJA
        </h1>

        {/* LOJA */}
        <label className="block font-semibold mb-1">LOJA</label>
        <select
          value={loja}
          onChange={(e) => setLoja(e.target.value)}
          className="w-full mb-5 p-3 border rounded-xl
                     focus:ring-2 focus:ring-[var(--oba-orange)]"
        >
          <option value="">SELECIONE A LOJA</option>
          {lojas.map((l) => (
            <option key={l.id} value={l.nome}>
              {l.nome}
            </option>
          ))}
        </select>

        {/* MATERIAL */}
        <label className="block font-semibold mb-1">MATERIAL</label>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full mb-5 p-3 border rounded-xl
                     focus:ring-2 focus:ring-[var(--oba-orange)]"
        >
          <option value="">SELECIONE O MATERIAL</option>
          {MATERIAIS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* QUANTIDADE */}
        <label className="block font-semibold mb-1">QUANTIDADE</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="w-full mb-5 p-3 border rounded-xl
                     focus:ring-2 focus:ring-[var(--oba-orange)]"
        />

        {/* OBSERVAÇÕES */}
        <label className="block font-semibold mb-1">OBSERVAÇÕES</label>
        <textarea
          rows={4}
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          className="w-full mb-8 p-3 border rounded-xl
                     focus:ring-2 focus:ring-[var(--oba-orange)]"
        />

        <button
          onClick={salvar}
          className="w-full bg-[var(--oba-green)] text-white
                     font-bold py-4 rounded-2xl text-lg"
        >
          REGISTRAR RETORNO
        </button>

        <div className="text-center mt-6">
          <a href="/" className="text-[var(--oba-orange)] font-semibold">
            VOLTAR AO INÍCIO
          </a>
        </div>
      </div>
    </div>
  );
}
