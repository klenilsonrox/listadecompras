import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lista de compras",
  description: "Sua lista de compras de forma simplificada",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
