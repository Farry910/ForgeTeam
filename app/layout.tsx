import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForgeTeam",
  description: "A local-first hybrid human-AI software workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link href="/" className="brand">
            ForgeTeam
          </Link>
          <Link href="/">Dashboard</Link>
          <Link href="/agents">Agents</Link>
          <Link href="/tasks">Tasks</Link>
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
