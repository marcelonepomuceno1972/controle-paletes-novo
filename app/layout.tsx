import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Controle de Paletes",
  description: "Sistema de controle de paletes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <nav className="bg-white border-b px-6 py-3 flex gap-4">
          <Link href="/">Início</Link>
          <Link href="/entrada">Entrada</Link>
          <Link href="/saida">Saída</Link>
          <Link href="/retorno-loja">Retorno Loja</Link>
          <Link href="/painel">Dashboard</Link>
          <Link href="/saldos">Saldo por Área</Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
