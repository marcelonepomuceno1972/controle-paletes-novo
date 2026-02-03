"use client";

import { useState } from "react";

export default function EntradaPage() {
  const [areaDestino, setAreaDestino] = useState("");
  const [tipoPalete, setTipoPalete] = useState("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setErro("");

    if (!areaDestino || !tipoPalete || !quantidade) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const res = await fetch("/api/entrada", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipoOperacao: "ENTRADA",
        areaOrigem: null,
        areaDestino,
        tipoPalete,
        quantidade: Number(quantidade),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.error || "Erro ao registrar entrada.");
      return;
    }

    setMensagem("Entrada registrada com sucesso!");
    setAreaDestino("");
    setTipoPalete("");
    setQuantidade("");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Registro de Entrada de Paletes</h1>
      <p className="text-gray-600 mb-6">
        Use para registrar entrada de paletes no estoque.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Área Destino */}
        <div>
          <label className="block text-sm font-medium">Área de Destino</label>
          <select
            value={areaDestino}
            onChange={(e) => setAreaDestino(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Selecione...</option>
            <option value="LOGISTICA REVERSA">LOGISTICA REVERSA</option>
            <option value="PRODUCAO">PRODUÇÃO</option>
            <option value="FLV">FLV</option>
            <option value="MERCEARIA">MERCEARIA</option>
            <option value="FRIGORIFICO">FRIGORÍFICO</option>
            <option value="PERECIVEL">PERECÍVEL</option>
          </select>
        </div>

        {/* Tipo de Palete */}
        <div>
          <label className="block text-sm font-medium">Tipo de Palete</label>
          <select
            value={tipoPalete}
            onChange={(e) => setTipoPalete(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Selecione...</option>
            <option value="PBR">PBR</option>
            <option value="CHEP">CHEP</option>
            <option value="DESCARTAVEL">DESCARTÁVEL</option>
            <option value="GAIOLA">GAIOLA</option>
          </select>
        </div>

        {/* Quantidade */}
        <div>
          <label className="block text-sm font-medium">Quantidade</label>
          <input
            type="number"
            min={1}
            value={quantidade}
            onChange={(e) =>
              setQuantidade(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full border rounded p-2"
          />
        </div>

        {/* Mensagens */}
        {erro && <p className="text-red-600">{erro}</p>}
        {mensagem && <p className="text-green-600">{mensagem}</p>}

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Registrar Entrada
        </button>
      </form>
    </div>
  );
}
