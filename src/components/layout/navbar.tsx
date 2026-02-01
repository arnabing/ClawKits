"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import type { User } from "@/types";

export function Navbar() {
  const pathname = usePathname();
  const user = useAppStore((s) => s.user);
  const isLanding = pathname === "/";

  if (isLanding) {
    return <LandingNavbar />;
  }

  return <AppNavbar user={user} pathname={pathname} />;
}

function LandingNavbar() {
  return (
    <nav className="fixed top-0 z-40 w-full border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <span className="text-sm font-bold text-white">CK</span>
          </div>
          <span className="text-lg font-bold text-white">ClawKit</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-surface-400 transition-colors hover:text-white">
            Features
          </a>
          <a href="#kits" className="text-sm text-surface-400 transition-colors hover:text-white">
            Kits
          </a>
          <a href="#pricing" className="text-sm text-surface-400 transition-colors hover:text-white">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm">
            Log in
          </Link>
          <Link href="/onboarding" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

function AppNavbar({
  user,
  pathname,
}: {
  user: User | null;
  pathname: string;
}) {
  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/kits", label: "Kits" },
    { href: "/chat", label: "Chat" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-surface-800 bg-surface-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600">
              <span className="text-xs font-bold text-white">CK</span>
            </div>
            <span className="text-base font-bold text-white">ClawKit</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "bg-surface-800 text-white"
                    : "text-surface-400 hover:bg-surface-800/50 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-medium text-white">
            {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </nav>
  );
}
