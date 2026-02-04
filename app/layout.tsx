import "./globals.css";

export const metadata = {
  title: "Sistema de Controle de Paletes",
  description: "Controle logístico de paletes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100">{children}</body>
    </html>
  );
}