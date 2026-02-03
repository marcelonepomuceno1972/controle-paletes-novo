"use client";

import { useState } from "react";

export default function SaidaPage() {
  const [fornecedor, setFornecedor] = useState("");
  const [tipoPalete, setTipoPalete] = useState("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setErro("");

    if (!fornecedor || !tipoPalete || !quantidade) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const res = await fetch("/api/saida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipoOperacao: "SAIDA",
        areaOrigem: "LOGISTICA REVERSA",
        areaDestino: fornecedor,
        tipoPalete,
        quantidade: Number(quantidade),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.error || "Erro ao registrar saída.");
      return;
    }

    setMensagem("Saída registrada com sucesso!");
    setFornecedor("");
    setTipoPalete("");
    setQuantidade("");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Registro de Saída de Paletes</h1>
      <p className="text-gray-600 mb-6">
        Use para registrar retirada/expedição de paletes da área.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Origem fixa */}
        <div>
          <label className="block text-sm font-medium">Área de Origem (fixa)</label>
          <input
            value="LOGISTICA REVERSA"
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        {/* Fornecedor / Destino */}
        <div>
          <label className="block text-sm font-medium">Fornecedor / Destino</label>
          <select
            value={fornecedor}
            onChange={(e) => setFornecedor(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Selecione...</option>
            <option value="Comércio de Frutas Steck">
              Comércio de Frutas Steck
            </option>
            <option value="Fornecedor Exemplo 2">
              Fornecedor Exemplo 2
            </option>
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrar Saída
        </button>
      </form>
    </div>
  );
}
