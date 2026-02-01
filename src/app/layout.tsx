import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "ClawKit - AI Agents That Actually Do Things",
  description:
    "Hosted OpenClaw instances with pre-configured use cases. No coding required. Pick a Kit, connect your accounts, and start using AI agents immediately.",
  keywords: ["AI agents", "OpenClaw", "automation", "no-code", "AI assistant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
