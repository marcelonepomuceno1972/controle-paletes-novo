export default async function SaldosPage() {
  const res = await fetch("http://localhost:3000/api/saldos", { cache: "no-store" });
  const data = await res.json();

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Saldo por Área</h2>
      {data.map((a: any) => (
        <div key={a.area} className="flex justify-between border-b py-2">
          <span>{a.area}</span>
          <strong>{a.total}</strong>
        </div>
      ))}
    </div>
  );
}
