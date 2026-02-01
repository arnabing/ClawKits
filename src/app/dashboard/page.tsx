"use client";

import { useAppStore } from "@/lib/store";
import { KITS } from "@/lib/kits";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const MOCK_USAGE = {
  messagesToday: 47,
  messagesThisMonth: 1284,
  tokensThisMonth: 542_000,
  estimatedCost: 8.12,
  uptime: 99.8,
};

const MOCK_ACTIVITY = [
  { id: 1, type: "briefing", message: "Morning briefing sent via Telegram", time: "7:00 AM" },
  { id: 2, type: "research", message: "Research completed: Q4 market analysis", time: "10:23 AM" },
  { id: 3, type: "message", message: "User conversation (12 messages)", time: "11:45 AM" },
  { id: 4, type: "briefing", message: "Calendar reminder: Team standup in 30min", time: "1:30 PM" },
  { id: 5, type: "research", message: "Research started: Competitor pricing review", time: "2:15 PM" },
];

export default function DashboardPage() {
  const instance = useAppStore((s) => s.instance);
  const user = useAppStore((s) => s.user);

  const installedKits = instance?.installedKits || [];
  const channels = instance?.channels || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="section-heading">Dashboard</h1>
          <p className="mt-1 text-sm text-surface-400">
            Welcome back{user?.name ? `, ${user.name}` : ""}. Your agent is running.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/kits">
            <Button variant="secondary" size="sm">Add Kit</Button>
          </Link>
          <Link href="/chat">
            <Button size="sm">Open Chat</Button>
          </Link>
        </div>
      </div>

      {/* Status Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-sm text-surface-400">Instance Status</p>
            <Badge variant={instance?.status === "RUNNING" ? "success" : "error"}>
              {instance?.status || "Unknown"}
            </Badge>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{MOCK_USAGE.uptime}%</p>
          <p className="text-xs text-surface-500">Uptime this month</p>
        </Card>

        <Card>
          <p className="text-sm text-surface-400">Messages Today</p>
          <p className="mt-2 text-2xl font-bold text-white">{MOCK_USAGE.messagesToday}</p>
          <p className="text-xs text-surface-500">
            {MOCK_USAGE.messagesThisMonth.toLocaleString()} this month
          </p>
        </Card>

        <Card>
          <p className="text-sm text-surface-400">Tokens Used</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {(MOCK_USAGE.tokensThisMonth / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-surface-500">This month</p>
        </Card>

        <Card>
          <p className="text-sm text-surface-400">Estimated Cost</p>
          <p className="mt-2 text-2xl font-bold text-white">
            ${MOCK_USAGE.estimatedCost.toFixed(2)}
          </p>
          <p className="text-xs text-surface-500">AI provider costs this month</p>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardTitle>Recent Activity</CardTitle>
            <div className="mt-4 space-y-4">
              {MOCK_ACTIVITY.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border border-surface-800 p-3"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      item.type === "briefing"
                        ? "bg-brand-500"
                        : item.type === "research"
                        ? "bg-green-500"
                        : "bg-surface-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-surface-200">{item.message}</p>
                    <p className="text-xs text-surface-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-brand-400 hover:text-brand-300">
                View all activity
              </button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Installed Kits */}
          <Card>
            <div className="flex items-center justify-between">
              <CardTitle>Active Kits</CardTitle>
              <Link href="/kits" className="text-xs text-brand-400 hover:text-brand-300">
                Browse more
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {installedKits.map((ik) => {
                const kit = KITS.find((k) => k.id === ik.kitId);
                if (!kit) return null;
                return (
                  <div
                    key={ik.id}
                    className="flex items-center justify-between rounded-lg border border-surface-800 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{kit.name}</p>
                      <p className="text-xs text-surface-500">{kit.description}</p>
                    </div>
                    <Badge variant={ik.active ? "success" : "default"}>
                      {ik.active ? "Active" : "Paused"}
                    </Badge>
                  </div>
                );
              })}
              {installedKits.length === 0 && (
                <p className="text-sm text-surface-500">
                  No kits installed yet.{" "}
                  <Link href="/kits" className="text-brand-400 hover:text-brand-300">
                    Browse kits
                  </Link>
                </p>
              )}
            </div>
          </Card>

          {/* Connected Channels */}
          <Card>
            <div className="flex items-center justify-between">
              <CardTitle>Channels</CardTitle>
              <Link href="/settings" className="text-xs text-brand-400 hover:text-brand-300">
                Manage
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {channels.map((ch) => (
                <div
                  key={ch.id}
                  className="flex items-center justify-between rounded-lg border border-surface-800 p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{ch.type}</span>
                  </div>
                  <Badge
                    variant={
                      ch.status === "CONNECTED"
                        ? "success"
                        : ch.status === "ERROR"
                        ? "error"
                        : "warning"
                    }
                  >
                    {ch.status}
                  </Badge>
                </div>
              ))}
              {channels.length === 0 && (
                <p className="text-sm text-surface-500">
                  No channels connected.{" "}
                  <Link href="/settings" className="text-brand-400 hover:text-brand-300">
                    Connect one
                  </Link>
                </p>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardTitle>Quick Actions</CardTitle>
            <div className="mt-4 space-y-2">
              <Link href="/chat" className="block">
                <button className="w-full rounded-lg border border-surface-700 p-2.5 text-left text-sm text-surface-300 transition-colors hover:border-surface-600 hover:bg-surface-800 hover:text-white">
                  Send a message to your agent
                </button>
              </Link>
              <button className="w-full rounded-lg border border-surface-700 p-2.5 text-left text-sm text-surface-300 transition-colors hover:border-surface-600 hover:bg-surface-800 hover:text-white">
                Restart instance
              </button>
              <button className="w-full rounded-lg border border-surface-700 p-2.5 text-left text-sm text-surface-300 transition-colors hover:border-surface-600 hover:bg-surface-800 hover:text-white">
                View logs
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
