import "./globals.css";
import Menu from "./components/Menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}
