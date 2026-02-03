"use client";

import { useEffect, useState } from "react";
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

export default function EntradaPage() {
  const [area, setArea] = useState("");
  const [material, setMaterial] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [fornecedores, setFornecedores] = useState<string[]>([]);

  /* 🔄 Carrega fornecedores existentes */
  useEffect(() => {
    fetch("/api/fornecedores")
      .then((r) => r.json())
      .then((data) => setFornecedores(data.map((f: any) => f.nome)));
  }, []);

  /* 💾 Salva fornecedor manualmente */
  async function salvarFornecedor() {
    if (!fornecedor.trim()) {
      alert("Informe o nome do fornecedor");
      return;
    }

    await fetch("/api/fornecedores", {
      method: "POST",
      body: JSON.stringify({ nome: fornecedor.trim() }),
    });

    alert("FORNECEDOR SALVO");
  }

  /* 📦 Salva entrada */
  async function salvarEntrada() {
    if (!area || !material || !quantidade || !fornecedor) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    await fetch("/api/entrada", {
      method: "POST",
      body: JSON.stringify({
        areaDestino: area,
        tipoPalete: material,
        quantidade: Number(quantidade),
        fornecedor: fornecedor.trim(),
        observacoes,
      }),
    });

    alert("ENTRADA REGISTRADA");

    setArea("");
    setMaterial("");
    setQuantidade("");
    setFornecedor("");
    setObservacoes("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-100">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-2xl font-bold text-center mb-8">
          REGISTRO DE ENTRADA DE PALETES
        </h1>

        {/* FORNECEDOR */}
        <label className="font-semibold block mb-1">FORNECEDOR</label>

        <div className="flex gap-2 mb-5">
          <input
            list="lista-fornecedores"
            value={fornecedor}
            onChange={(e) => setFornecedor(e.target.value)}
            className="flex-1 p-3 border rounded-xl overflow-x-auto whitespace-nowrap"
            placeholder="Digite ou selecione o fornecedor"
          />

          <button
            type="button"
            onClick={salvarFornecedor}
            className="px-5 rounded-xl bg-orange-600 text-white font-semibold"
          >
            SALVAR
          </button>
        </div>

        <datalist id="lista-fornecedores">
          {fornecedores.map((f) => (
            <option key={f} value={f} />
          ))}
        </datalist>

        {/* ÁREA */}
        <label className="font-semibold">ÁREA DESTINO</label>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full mb-5 p-3 border rounded-xl"
        >
          <option value="">SELECIONE</option>
          {AREAS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>

        {/* MATERIAL */}
        <label className="font-semibold">MATERIAL</label>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full mb-5 p-3 border rounded-xl"
        >
          <option value="">SELECIONE</option>
          {MATERIAIS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        {/* QUANTIDADE */}
        <label className="font-semibold">QUANTIDADE</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="w-full mb-5 p-3 border rounded-xl"
        />

        {/* OBSERVAÇÕES */}
        <label className="font-semibold">OBSERVAÇÕES</label>
        <textarea
          rows={3}
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          className="w-full mb-8 p-3 border rounded-xl"
        />

        {/* BOTÃO PRINCIPAL */}
        <button
          onClick={salvarEntrada}
          className="w-full bg-green-700 text-white font-bold py-4 rounded-2xl"
        >
          REGISTRAR ENTRADA
        </button>

        {/* 🔙 VOLTAR AO INÍCIO */}
        <div className="text-center mt-6">
          <Link href="/" className="text-orange-600 font-semibold">
            VOLTAR AO INÍCIO
          </Link>
        </div>
      </div>
    </div>
  );
}