export type Plan = "STARTER" | "PRO" | "TEAM" | "ENTERPRISE";
export type InstanceStatus = "PROVISIONING" | "RUNNING" | "STOPPED" | "ERROR";
export type AiProvider = "ANTHROPIC" | "OPENAI" | "OPENROUTER";
export type ChannelType = "TELEGRAM" | "WHATSAPP" | "DISCORD" | "SLACK";
export type ChannelStatus = "CONNECTED" | "DISCONNECTED" | "ERROR";

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  plan: Plan;
  stripeCustomerId: string | null;
  createdAt: string;
}

export interface Instance {
  id: string;
  userId: string;
  railwayProjectId: string | null;
  status: InstanceStatus;
  gatewayUrl: string | null;
  gatewayToken: string | null;
  createdAt: string;
  lastHealthCheck: string | null;
  installedKits?: InstalledKit[];
  channels?: Channel[];
}

export interface InstalledKit {
  id: string;
  instanceId: string;
  kitId: string;
  config: Record<string, unknown>;
  installedAt: string;
  active: boolean;
}

export interface ApiKey {
  id: string;
  userId: string;
  provider: AiProvider;
  label: string | null;
  createdAt: string;
}

export interface Channel {
  id: string;
  instanceId: string;
  type: ChannelType;
  config: Record<string, unknown>;
  status: ChannelStatus;
  connectedAt: string | null;
}

export interface UsageLog {
  id: string;
  instanceId: string;
  date: string;
  messagesSent: number;
  tokensUsed: number;
  estimatedCost: number;
}

export interface Kit {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: KitCategory;
  requiredIntegrations: string[];
  customizationOptions: CustomizationOption[];
  soul: string;
  cron?: CronConfig;
  popular?: boolean;
}

export type KitCategory =
  | "productivity"
  | "research"
  | "content"
  | "communication"
  | "monitoring";

export interface CustomizationOption {
  key: string;
  label: string;
  type: "text" | "select" | "time" | "timezone" | "tags" | "toggle";
  defaultValue: string | string[] | boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  description?: string;
}

export interface CronConfig {
  name: string;
  schedule: string;
  timezone: string;
  message: string;
  session: "isolated" | "persistent";
}

export interface PricingTier {
  name: string;
  plan: Plan;
  price: number;
  description: string;
  features: string[];
  limits: {
    kits: number;
    channels: number;
    messagesPerMonth: number;
  };
  highlighted?: boolean;
}
