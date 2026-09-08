import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Total Gaming — Esports Statistics",
  description:
    "Total Gaming esports match results, tournament points, player statistics and MVPs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
