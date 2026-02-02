export default function Home() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Controle de Paletes</h1>

      <a href="/entrada" className="block bg-blue-600 text-white p-3 rounded text-center">
        Registrar Entrada
      </a>

      <a href="/saida" className="block bg-green-600 text-white p-3 rounded text-center">
        Registrar Saída
      </a>

      <a href="/retorno-loja" className="block bg-purple-600 text-white p-3 rounded text-center">
        Retorno de Loja
      </a>

      <a href="/painel" className="block bg-black text-white p-3 rounded text-center">
        Dashboard
      </a>

      <a href="/saldos" className="block border p-3 rounded text-center">
        Saldo por Área
      </a>
    </div>
  );
}
