export default async function PainelPage() {
  const res = await fetch("http://localhost:3000/api/saldos", { cache: "no-store" });
  const data = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((a: any) => (
        <div key={a.area} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">{a.area}</h3>
          <p className="text-3xl">{a.total}</p>
        </div>
      ))}
    </div>
  );
}
