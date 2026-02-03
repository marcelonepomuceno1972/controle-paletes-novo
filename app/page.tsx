import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">

        <h1 className="text-2xl font-bold mb-2">
          CONTROLE DE PALETES
        </h1>

        <div className="space-y-3">

          <Link
            href="/painel"
            className="block w-full bg-gray-900 text-white py-3 rounded-xl font-semibold"
          >
            DASHBOARD
          </Link>

          <Link
            href="/entrada"
            className="block w-full bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            REGISTRO DE ENTRADA
          </Link>

          <Link
            href="/saida"
            className="block w-full bg-red-700 text-white py-3 rounded-xl font-semibold"
          >
            REGISTRO DE SAÍDA
          </Link>

          <Link
            href="/retorno-loja"
            className="block w-full bg-orange-600 text-white py-3 rounded-xl font-semibold"
          >
            RETORNO DE LOJA
          </Link>

        </div>
      </div>
    </main>
  );
}