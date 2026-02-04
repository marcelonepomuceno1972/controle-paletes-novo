"use client";

import { useState } from "react";
import CampoSelect from "@/app/components/CampoSelect";
import CampoNumero from "@/app/components/CampoNumero";

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
      body: JSON.stringify({
        areaOrigem: origem,
        areaDestino: destino,
        tipoPalete: material,
        quantidade: Number(quantidade),
        observacoes,
      }),
    });

    alert("MOVIMENTAÇÃO REGISTRADA");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-12">
        <div className="flex justify-center mb-6">
          <img src="/logo-oba.png" className="h-14" />
        </div>

        <h1 className="text-2xl font-bold text-center text-[var(--oba-green)] mb-8">
          MOVIMENTAÇÃO DE PALETES
        </h1>

        <CampoSelect label="ORIGEM" value={origem} setValue={setOrigem} lista={AREAS} />
        <CampoSelect label="DESTINO" value={destino} setValue={setDestino} lista={AREAS} />
        <CampoSelect label="MATERIAL" value={material} setValue={setMaterial} lista={MATERIAIS} />
        <CampoNumero label="QUANTIDADE" value={quantidade} setValue={setQuantidade} />
        <CampoTexto label="OBSERVAÇÕES" value={observacoes} setValue={setObservacoes} />

        <BotaoSalvar texto="REGISTRAR MOVIMENTAÇÃO" />
        <VoltarInicio />
      </div>
    </div>
  );
}