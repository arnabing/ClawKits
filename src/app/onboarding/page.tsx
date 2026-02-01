"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KITS } from "@/lib/kits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Kit, CustomizationOption } from "@/types";

const STEPS = [
  { title: "Choose Your First Kit", description: "Pick an AI agent kit to get started. You can always add more later." },
  { title: "Connect AI Provider", description: "Choose your preferred AI model provider and add your API key." },
  { title: "Connect Messaging Channel", description: "Choose where your agent will send and receive messages." },
  { title: "Customize Your Kit", description: "Fine-tune your kit to match your preferences." },
];

const PROVIDERS = [
  { id: "anthropic", name: "Anthropic", description: "Claude models — best for nuanced tasks", recommended: true },
  { id: "openai", name: "OpenAI", description: "GPT models — widely supported", recommended: false },
  { id: "openrouter", name: "OpenRouter", description: "Access multiple providers with one key", recommended: false },
] as const;

const CHANNELS = [
  { id: "telegram", name: "Telegram", description: "Instant setup, rich formatting", recommended: true, easiest: true },
  { id: "whatsapp", name: "WhatsApp", description: "End-to-end encrypted messaging", recommended: false, easiest: false },
  { id: "discord", name: "Discord", description: "Great for teams and communities", recommended: false, easiest: false },
  { id: "slack", name: "Slack", description: "Integrates with your workspace", recommended: false, easiest: false },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("anthropic");
  const [apiKey, setApiKey] = useState("");
  const [apiKeyValidated, setApiKeyValidated] = useState(false);
  const [validating, setValidating] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>("telegram");
  const [kitConfig, setKitConfig] = useState<Record<string, unknown>>({});

  function initKitConfig(kit: Kit) {
    const config: Record<string, unknown> = {};
    for (const opt of kit.customizationOptions) {
      config[opt.key] = opt.defaultValue;
    }
    setKitConfig(config);
  }

  function handleSelectKit(kit: Kit) {
    setSelectedKit(kit);
    initKitConfig(kit);
  }

  function handleValidateKey() {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setApiKeyValidated(true);
    }, 1500);
  }

  function canContinue(): boolean {
    switch (currentStep) {
      case 0:
        return selectedKit !== null;
      case 1:
        return apiKey.length > 0 && apiKeyValidated;
      case 2:
        return selectedChannel !== "";
      case 3:
        return true;
      default:
        return false;
    }
  }

  function handleContinue() {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function updateConfig(key: string, value: unknown) {
    setKitConfig((prev) => ({ ...prev, [key]: value }));
  }

  // ── Step renderers ──────────────────────────────────────────────

  function renderStepOne() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KITS.map((kit) => {
          const isSelected = selectedKit?.id === kit.id;
          const isRecommended = kit.id === "morning-briefing";
          return (
            <button
              key={kit.id}
              type="button"
              onClick={() => handleSelectKit(kit)}
              className={`relative rounded-xl border-2 p-5 text-left transition-all ${
                isSelected
                  ? "border-brand-600 bg-brand-600/10"
                  : "border-surface-700 bg-surface-800 hover:border-surface-600"
              }`}
            >
              {isRecommended && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Recommended
                </span>
              )}
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-700 text-xs font-medium text-surface-300">
                  {kit.icon}
                </span>
                <span className="inline-block rounded-full bg-surface-700 px-2.5 py-0.5 text-[10px] font-medium capitalize text-surface-400">
                  {kit.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-surface-100">
                {kit.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-surface-400">
                {kit.description}
              </p>
            </button>
          );
        })}
      </div>
    );
  }

  function renderStepTwo() {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        {/* Provider selection */}
        <div className="space-y-3">
          {PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => {
                setSelectedProvider(provider.id);
                setApiKeyValidated(false);
              }}
              className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                selectedProvider === provider.id
                  ? "border-brand-600 bg-brand-600/10"
                  : "border-surface-700 bg-surface-800 hover:border-surface-600"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selectedProvider === provider.id
                    ? "border-brand-600"
                    : "border-surface-600"
                }`}
              >
                {selectedProvider === provider.id && (
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-surface-100">
                    {provider.name}
                  </span>
                  {provider.recommended && (
                    <span className="rounded-full bg-brand-600/20 px-2 py-0.5 text-[10px] font-semibold text-brand-400">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-xs text-surface-400">{provider.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* API Key input */}
        <div className="space-y-3">
          <Input
            id="api-key"
            label="API Key"
            type="password"
            placeholder={`Enter your ${PROVIDERS.find((p) => p.id === selectedProvider)?.name} API key`}
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setApiKeyValidated(false);
            }}
            hint={
              apiKeyValidated
                ? "API key validated successfully."
                : undefined
            }
          />
          <div className="flex items-center justify-between">
            <Link
              href="#"
              className="text-xs text-brand-400 hover:text-brand-300 hover:underline"
            >
              Get an API key &rarr;
            </Link>
            <Button
              size="sm"
              variant={apiKeyValidated ? "secondary" : "primary"}
              disabled={apiKey.length === 0 || validating}
              loading={validating}
              onClick={handleValidateKey}
            >
              {apiKeyValidated ? "Validated" : "Validate Key"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function renderStepThree() {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div className="space-y-3">
          {CHANNELS.map((channel) => (
            <button
              key={channel.id}
              type="button"
              onClick={() => setSelectedChannel(channel.id)}
              className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                selectedChannel === channel.id
                  ? "border-brand-600 bg-brand-600/10"
                  : "border-surface-700 bg-surface-800 hover:border-surface-600"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selectedChannel === channel.id
                    ? "border-brand-600"
                    : "border-surface-600"
                }`}
              >
                {selectedChannel === channel.id && (
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-surface-100">
                    {channel.name}
                  </span>
                  {channel.recommended && (
                    <span className="rounded-full bg-brand-600/20 px-2 py-0.5 text-[10px] font-semibold text-brand-400">
                      Recommended
                    </span>
                  )}
                  {channel.easiest && (
                    <span className="rounded-full bg-emerald-600/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      Easiest
                    </span>
                  )}
                </div>
                <p className="text-xs text-surface-400">{channel.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Channel-specific instructions */}
        {selectedChannel === "telegram" && (
          <div className="rounded-xl border border-surface-700 bg-surface-800 p-5">
            <h4 className="text-sm font-semibold text-surface-100">
              Connect Telegram
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-surface-400">
              Message{" "}
              <span className="font-mono font-semibold text-brand-400">
                @ClawKitBot
              </span>{" "}
              on Telegram to connect your account. The bot will guide you through
              linking your agent.
            </p>
          </div>
        )}

        {selectedChannel === "whatsapp" && (
          <div className="rounded-xl border border-surface-700 bg-surface-800 p-5">
            <h4 className="text-sm font-semibold text-surface-100">
              Connect WhatsApp
            </h4>
            <p className="mt-2 mb-4 text-sm text-surface-400">
              Scan the QR code below with your WhatsApp camera.
            </p>
            <div className="flex h-48 w-48 items-center justify-center rounded-lg border border-dashed border-surface-600 bg-surface-900 text-xs text-surface-500">
              QR Code Placeholder
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderCustomizationField(opt: CustomizationOption) {
    const value = kitConfig[opt.key] ?? opt.defaultValue;

    switch (opt.type) {
      case "text":
      case "time":
      case "timezone":
        return (
          <Input
            key={opt.key}
            id={opt.key}
            label={opt.label}
            type={opt.type === "time" ? "time" : "text"}
            value={String(value)}
            placeholder={opt.placeholder}
            hint={opt.description}
            onChange={(e) => updateConfig(opt.key, e.target.value)}
          />
        );

      case "select":
        return (
          <div key={opt.key} className="space-y-1.5">
            <label
              htmlFor={opt.key}
              className="block text-sm font-medium text-surface-300"
            >
              {opt.label}
            </label>
            <select
              id={opt.key}
              value={String(value)}
              onChange={(e) => updateConfig(opt.key, e.target.value)}
              className="input w-full appearance-none"
            >
              {opt.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {opt.description && (
              <p className="text-xs text-surface-500">{opt.description}</p>
            )}
          </div>
        );

      case "toggle":
        return (
          <div key={opt.key} className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-surface-300">
                {opt.label}
              </span>
              {opt.description && (
                <p className="text-xs text-surface-500">{opt.description}</p>
              )}
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={Boolean(value)}
              onClick={() => updateConfig(opt.key, !value)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                value ? "bg-brand-600" : "bg-surface-600"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  value ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        );

      case "tags":
        return (
          <Input
            key={opt.key}
            id={opt.key}
            label={opt.label}
            type="text"
            value={Array.isArray(value) ? (value as string[]).join(", ") : String(value)}
            placeholder={opt.placeholder}
            hint={opt.description ?? "Separate values with commas"}
            onChange={(e) =>
              updateConfig(
                opt.key,
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
          />
        );

      default:
        return null;
    }
  }

  function renderStepFour() {
    if (!selectedKit) return null;

    return (
      <div className="mx-auto max-w-lg space-y-6">
        {/* Kit summary */}
        <div className="rounded-xl border border-surface-700 bg-surface-800 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-700 text-xs font-medium text-surface-300">
              {selectedKit.icon}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-surface-100">
                {selectedKit.name}
              </h3>
              <p className="text-xs text-surface-400">
                {selectedKit.description}
              </p>
            </div>
          </div>
        </div>

        {/* Customization fields */}
        <div className="space-y-5">
          {selectedKit.customizationOptions.map((opt) =>
            renderCustomizationField(opt)
          )}
        </div>
      </div>
    );
  }

  const stepRenderers = [renderStepOne, renderStepTwo, renderStepThree, renderStepFour];

  // ── Main render ─────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen flex-col bg-surface-950">
      {/* Progress bar */}
      <div className="border-b border-surface-800 bg-surface-900">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      i < currentStep
                        ? "bg-brand-600 text-white"
                        : i === currentStep
                          ? "bg-brand-600 text-white"
                          : "bg-surface-700 text-surface-400"
                    }`}
                  >
                    {i < currentStep ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`hidden text-xs font-medium sm:inline ${
                      i <= currentStep ? "text-surface-100" : "text-surface-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-3 hidden h-px w-12 sm:block lg:w-20 ${
                      i < currentStep ? "bg-brand-600" : "bg-surface-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-10">
          {/* Step header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-surface-100">
              {STEPS[currentStep].title}
            </h1>
            <p className="mt-2 text-sm text-surface-400">
              {STEPS[currentStep].description}
            </p>
          </div>

          {/* Step body */}
          {stepRenderers[currentStep]()}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="border-t border-surface-800 bg-surface-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <div className="flex items-center gap-2 text-xs text-surface-500">
            Step {currentStep + 1} of {STEPS.length}
          </div>
          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={!canContinue()}
          >
            {currentStep === 3 ? "Launch Your Agent" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
