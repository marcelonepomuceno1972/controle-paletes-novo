import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <nav className="bg-white border-b px-6 py-3 flex gap-4">
          <Link href="/">Início</Link>
          <Link href="/entrada">Entrada</Link>
          <Link href="/saida">Saída</Link>
          <Link href="/retorno-loja">Retorno</Link>
          <Link href="/painel">Dashboard</Link>
          <Link href="/saldos">Saldos</Link>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
