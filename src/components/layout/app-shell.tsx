"use client";

import { useEffect } from "react";
import { Navbar } from "./navbar";
import { useAppStore } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const loadMockData = useAppStore((s) => s.loadMockData);

  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />
      <main className="pt-14">{children}</main>
    </div>
  );
}
