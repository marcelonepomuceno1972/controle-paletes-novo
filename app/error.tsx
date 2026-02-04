"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center">
          <h2 className="text-xl font-bold mb-4">
            Ocorreu um erro na aplicação
          </h2>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  );
}
