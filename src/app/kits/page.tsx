"use client";

import { useState } from "react";
import { KITS, KIT_CATEGORIES } from "@/lib/kits";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import type { Kit } from "@/types";
import { cn } from "@/lib/utils";

export default function KitsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [installing, setInstalling] = useState(false);
  const instance = useAppStore((s) => s.instance);
  const addInstalledKit = useAppStore((s) => s.addInstalledKit);

  const installedKitIds = (instance?.installedKits || []).map((k) => k.kitId);

  const filteredKits =
    selectedCategory === "all"
      ? KITS
      : KITS.filter((k) => k.category === selectedCategory);

  async function handleInstall(kit: Kit) {
    setInstalling(true);
    // Simulate installation
    await new Promise((r) => setTimeout(r, 2000));
    addInstalledKit({
      id: `ik_${Date.now()}`,
      instanceId: instance?.id || "",
      kitId: kit.id,
      config: {},
      installedAt: new Date().toISOString(),
      active: true,
    });
    setInstalling(false);
    setSelectedKit(null);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-heading">Kit Store</h1>
        <p className="mt-1 text-sm text-surface-400">
          Pre-configured AI agent setups ready to use. Pick one and start automating.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {KIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              selectedCategory === cat.id
                ? "bg-brand-600 text-white"
                : "bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-white"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Kit Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredKits.map((kit) => {
          const isInstalled = installedKitIds.includes(kit.id);
          return (
            <Card
              key={kit.id}
              hover
              onClick={() => setSelectedKit(kit)}
              className="relative"
            >
              {kit.popular && (
                <div className="absolute right-4 top-4">
                  <Badge variant="info">Popular</Badge>
                </div>
              )}
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/10 text-brand-400">
                <KitIcon name={kit.icon} />
              </div>
              <h3 className="text-base font-semibold text-white">{kit.name}</h3>
              <p className="mt-1 text-sm text-surface-400">{kit.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {kit.requiredIntegrations.map((integration) => (
                  <span
                    key={integration}
                    className="rounded bg-surface-800 px-2 py-0.5 text-xs text-surface-400"
                  >
                    {integration}
                  </span>
                ))}
                {kit.requiredIntegrations.length === 0 && (
                  <span className="rounded bg-surface-800 px-2 py-0.5 text-xs text-surface-400">
                    No integrations needed
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs capitalize text-surface-500">
                  {kit.category}
                </span>
                {isInstalled ? (
                  <Badge variant="success">Installed</Badge>
                ) : (
                  <span className="text-xs text-brand-400">Click to install</span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Kit Detail Modal */}
      <Modal
        open={!!selectedKit}
        onClose={() => setSelectedKit(null)}
        title={selectedKit?.name}
        className="max-w-xl"
      >
        {selectedKit && (
          <div>
            <p className="text-sm text-surface-300">
              {selectedKit.longDescription}
            </p>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-surface-200">
                Required Integrations
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedKit.requiredIntegrations.map((i) => (
                  <Badge key={i} variant="default">
                    {i}
                  </Badge>
                ))}
                {selectedKit.requiredIntegrations.length === 0 && (
                  <span className="text-sm text-surface-500">
                    None - works out of the box
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-surface-200">
                Customization Options
              </h4>
              <ul className="mt-2 space-y-1">
                {selectedKit.customizationOptions.map((opt) => (
                  <li
                    key={opt.key}
                    className="text-sm text-surface-400"
                  >
                    <span className="text-surface-300">{opt.label}</span>
                    {opt.description && (
                      <span className="text-surface-500">
                        {" "}
                        — {opt.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {selectedKit.cron && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-surface-200">
                  Scheduled Task
                </h4>
                <p className="mt-1 text-sm text-surface-400">
                  Runs on schedule: <code className="text-xs text-brand-400">{selectedKit.cron.schedule}</code>
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setSelectedKit(null)}
              >
                Cancel
              </Button>
              {installedKitIds.includes(selectedKit.id) ? (
                <Button disabled>Already Installed</Button>
              ) : (
                <Button
                  loading={installing}
                  onClick={() => handleInstall(selectedKit)}
                >
                  Install Kit
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function KitIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Sunrise: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 0a7 7 0 017 7H5a7 7 0 017-7zm-9 9h18M6.343 5.343l1.414 1.414M17.657 5.343l-1.414 1.414" />
      </svg>
    ),
    Mail: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    Search: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    PenTool: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
      </svg>
    ),
    Users: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    Radio: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  };

  return <>{icons[name] || icons.Search}</>;
}
