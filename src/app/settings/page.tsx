"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import type { User, Instance } from "@/types";

export default function SettingsPage() {
  const user = useAppStore((s) => s.user);
  const instance = useAppStore((s) => s.instance);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="section-heading">Settings</h1>
        <p className="mt-1 text-sm text-surface-400">
          Manage your account, API keys, channels, and billing.
        </p>
      </div>

      <div className="space-y-8">
        <ProfileSection user={user} />
        <ApiKeysSection />
        <ChannelsSection instance={instance} />
        <InstanceSection instance={instance} />
        <BillingSection user={user} />
        <DangerZone />
      </div>
    </div>
  );
}

function ProfileSection({ user }: { user: User | null }) {
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  return (
    <Card>
      <CardTitle>Profile</CardTitle>
      <CardDescription>Your account information</CardDescription>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <Input
          label="Email"
          value={email}
          disabled
          hint="Email cannot be changed"
        />
      </div>
      <div className="mt-4">
        <Button size="sm">Save Changes</Button>
      </div>
    </Card>
  );
}

function ApiKeysSection() {
  const [showAddKey, setShowAddKey] = useState(false);
  const [provider, setProvider] = useState("ANTHROPIC");
  const [apiKey, setApiKey] = useState("");
  const [keys, setKeys] = useState([
    { id: "1", provider: "ANTHROPIC", label: "Main Key", createdAt: "2026-01-25" },
  ]);

  function handleAddKey() {
    if (!apiKey.trim()) return;
    setKeys((prev) => [
      ...prev,
      {
        id: `key_${Date.now()}`,
        provider,
        label: `${provider} Key`,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setApiKey("");
    setShowAddKey(false);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Your AI provider API keys. You bring your own keys — we never see your token costs.
          </CardDescription>
        </div>
        <Button size="sm" variant="secondary" onClick={() => setShowAddKey(true)}>
          Add Key
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {keys.map((key) => (
          <div
            key={key.id}
            className="flex items-center justify-between rounded-lg border border-surface-800 p-3"
          >
            <div className="flex items-center gap-3">
              <Badge variant="info">{key.provider}</Badge>
              <div>
                <p className="text-sm font-medium text-white">{key.label}</p>
                <p className="text-xs text-surface-500">Added {key.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-surface-500">sk-...****</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setKeys((prev) => prev.filter((k) => k.id !== key.id))}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showAddKey} onClose={() => setShowAddKey(false)} title="Add API Key">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-300">
              Provider
            </label>
            <div className="flex gap-2">
              {["ANTHROPIC", "OPENAI", "OPENROUTER"].map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                    provider === p
                      ? "border-brand-500 bg-brand-600/10 text-brand-400"
                      : "border-surface-700 text-surface-400 hover:border-surface-600"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <Input
            label="API Key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
          />
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowAddKey(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddKey}>Add Key</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

function ChannelsSection({
  instance,
}: {
  instance: Instance | null;
}) {
  const [showConnect, setShowConnect] = useState<string | null>(null);
  const channels = instance?.channels || [];

  const channelOptions = [
    {
      type: "TELEGRAM",
      name: "Telegram",
      description: "Recommended - Easiest to set up",
      instructions: "Message @ClawKitBot on Telegram to get your connection token.",
    },
    {
      type: "WHATSAPP",
      name: "WhatsApp",
      description: "Scan QR code to connect",
      instructions: "Open WhatsApp > Settings > Linked Devices > Scan QR code below.",
    },
    {
      type: "DISCORD",
      name: "Discord",
      description: "Add bot to your server",
      instructions: "Click the invite link to add ClawKit Bot to your Discord server.",
    },
    {
      type: "SLACK",
      name: "Slack",
      description: "Connect to your workspace",
      instructions: "Install the ClawKit app in your Slack workspace.",
    },
  ];

  return (
    <Card>
      <CardTitle>Messaging Channels</CardTitle>
      <CardDescription>
        Connect messaging apps to chat with your agent anywhere.
      </CardDescription>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {channelOptions.map((opt) => {
          const connected = channels.find((c) => c.type === opt.type);
          return (
            <div
              key={opt.type}
              className="rounded-lg border border-surface-800 p-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">{opt.name}</h4>
                {connected ? (
                  <Badge variant="success">Connected</Badge>
                ) : (
                  <Badge variant="default">Not connected</Badge>
                )}
              </div>
              <p className="mt-1 text-xs text-surface-500">{opt.description}</p>
              <div className="mt-3">
                {connected ? (
                  <Button size="sm" variant="ghost">
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowConnect(opt.type)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={!!showConnect}
        onClose={() => setShowConnect(null)}
        title={`Connect ${channelOptions.find((o) => o.type === showConnect)?.name}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-surface-300">
            {channelOptions.find((o) => o.type === showConnect)?.instructions}
          </p>

          {showConnect === "WHATSAPP" && (
            <div className="flex items-center justify-center rounded-lg border border-surface-700 bg-white p-8">
              <div className="h-48 w-48 rounded bg-surface-200 flex items-center justify-center">
                <span className="text-sm text-surface-600">QR Code Placeholder</span>
              </div>
            </div>
          )}

          {showConnect === "TELEGRAM" && (
            <div className="rounded-lg border border-surface-700 bg-surface-800 p-4">
              <p className="font-mono text-sm text-brand-400">@ClawKitBot</p>
              <p className="mt-1 text-xs text-surface-500">
                Send /start to begin the connection process
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowConnect(null)}>
              Cancel
            </Button>
            <Button onClick={() => setShowConnect(null)}>
              I&apos;ve Connected
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

function InstanceSection({
  instance,
}: {
  instance: Instance | null;
}) {
  const [restarting, setRestarting] = useState(false);

  async function handleRestart() {
    setRestarting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setRestarting(false);
  }

  return (
    <Card>
      <CardTitle>Instance</CardTitle>
      <CardDescription>Manage your OpenClaw instance.</CardDescription>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-surface-800 p-3">
          <p className="text-xs text-surface-500">Status</p>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                instance?.status === "RUNNING" ? "bg-green-500" : "bg-red-500"
              )}
            />
            <span className="text-sm font-medium text-white">
              {instance?.status || "Unknown"}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-surface-800 p-3">
          <p className="text-xs text-surface-500">Last Health Check</p>
          <p className="mt-1 text-sm font-medium text-white">
            {instance?.lastHealthCheck
              ? new Date(instance.lastHealthCheck).toLocaleString()
              : "Never"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Button
          size="sm"
          variant="secondary"
          loading={restarting}
          onClick={handleRestart}
        >
          Restart Instance
        </Button>
      </div>
    </Card>
  );
}

function BillingSection({ user }: { user: User | null }) {
  return (
    <Card>
      <CardTitle>Billing</CardTitle>
      <CardDescription>Manage your subscription and billing.</CardDescription>

      <div className="mt-4 rounded-lg border border-surface-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">
              {user?.plan || "Starter"} Plan
            </p>
            <p className="text-xs text-surface-500">
              {user?.plan === "PRO"
                ? "$49/month"
                : user?.plan === "TEAM"
                ? "$99/month"
                : "$19/month"}
            </p>
          </div>
          <Button size="sm" variant="secondary">
            Manage Subscription
          </Button>
        </div>
      </div>
    </Card>
  );
}

function DangerZone() {
  return (
    <Card className="border-red-500/20">
      <CardTitle>Danger Zone</CardTitle>
      <CardDescription>
        Irreversible actions. Proceed with caution.
      </CardDescription>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-red-500/20 p-3">
          <div>
            <p className="text-sm font-medium text-white">Delete Instance</p>
            <p className="text-xs text-surface-500">
              Stop and permanently delete your OpenClaw instance and all data.
            </p>
          </div>
          <Button size="sm" variant="danger">
            Delete
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-red-500/20 p-3">
          <div>
            <p className="text-sm font-medium text-white">Delete Account</p>
            <p className="text-xs text-surface-500">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <Button size="sm" variant="danger">
            Delete Account
          </Button>
        </div>
      </div>
    </Card>
  );
}
