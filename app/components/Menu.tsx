"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

  function linkClass(path: string) {
    return pathname === path
      ? "px-3 py-2 rounded bg-blue-600 text-white"
      : "px-3 py-2 rounded hover:bg-gray-200";
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex gap-4">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link href="/entrada" className={linkClass("/entrada")}>
          Entrada
        </Link>

        <Link href="/saida" className={linkClass("/saida")}>
          Saída
        </Link>

        <Link href="/retorno-loja" className={linkClass("/retorno-loja")}>
          Retorno
        </Link>

        <Link href="/movimentacao" className={linkClass("/movimentacao")}>
          Movimentação
        </Link>
      </div>
    </nav>
  );
}
