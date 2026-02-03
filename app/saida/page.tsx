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

const MATERIAIS = ["PBR", "DESCARTAVEL", "CHEP", "GAIOLA"];

export default function SaidaPage() {
  const [destino, setDestino] = useState("");
  const [material, setMaterial] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  async function salvar() {
    await fetch("/api/saida", {
      method: "POST",
      body: JSON.stringify({
        areaDestino: destino,
        tipoPalete: material,
        quantidade: Number(quantidade),
        observacoes,
      }),
    });

    alert("SAÍDA REGISTRADA COM SUCESSO");
    setDestino("");
    setMaterial("");
    setQuantidade("");
    setObservacoes("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-12">
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src="/logo-oba.png" alt="Oba Hortifruti" className="h-14" />
        </div>

        {/* TÍTULO */}
        <h1 className="text-2xl font-bold text-center text-[var(--oba-green)] mb-8">
          REGISTRO DE SAÍDA DE PALETES
        </h1>

        {/* DESTINO */}
        <Label>DESTINO</Label>
        <Select value={destino} onChange={setDestino} lista={AREAS} />

        {/* MATERIAL */}
        <Label>MATERIAL</Label>
        <Select value={material} onChange={setMaterial} lista={MATERIAIS} />

        {/* QUANTIDADE */}
        <Label>QUANTIDADE</Label>
        <InputNumero value={quantidade} onChange={setQuantidade} />

        {/* OBSERVAÇÕES */}
        <Label>OBSERVAÇÕES</Label>
        <Textarea value={observacoes} onChange={setObservacoes} />

        {/* BOTÃO */}
        <button
          onClick={salvar}
          className="w-full bg-[var(--oba-green)] hover:brightness-110
                     text-white font-bold py-4 rounded-2xl
                     transition-all text-lg"
        >
          REGISTRAR SAÍDA
        </button>

        {/* VOLTAR */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="font-semibold text-[var(--oba-orange)] hover:underline"
          >
            VOLTAR AO INÍCIO
          </a>
        </div>
      </div>
    </div>
  );
}

/* ===== COMPONENTES ===== */

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block font-semibold mb-1">{children}</label>;
}

function Select({
  value,
  onChange,
  lista,
}: {
  value: string;
  onChange: (v: string) => void;
  lista: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-5 p-3 border rounded-xl
                 focus:outline-none
                 focus:border-[var(--oba-green)]
                 focus:ring-2 focus:ring-[var(--oba-orange)]"
    >
      <option value="">SELECIONE</option>
      {lista.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

function InputNumero({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-5 p-3 border rounded-xl
                 focus:outline-none
                 focus:border-[var(--oba-green)]
                 focus:ring-2 focus:ring-[var(--oba-orange)]"
    />
  );
}

function Textarea({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-8 p-3 border rounded-xl
                 focus:outline-none
                 focus:border-[var(--oba-green)]
                 focus:ring-2 focus:ring-[var(--oba-orange)]"
    />
  );
}