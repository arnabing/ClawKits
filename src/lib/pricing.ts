import { PricingTier } from "@/types";

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    plan: "STARTER",
    price: 19,
    description: "Perfect for getting started with AI agents",
    features: [
      "1 Kit active at a time",
      "1 messaging channel",
      "5,000 messages per month",
      "Community support",
      "Web chat interface",
    ],
    limits: {
      kits: 1,
      channels: 1,
      messagesPerMonth: 5000,
    },
  },
  {
    name: "Pro",
    plan: "PRO",
    price: 49,
    description: "For power users who need multiple agents",
    features: [
      "3 Kits active simultaneously",
      "All messaging channels",
      "25,000 messages per month",
      "Priority support",
      "Custom Kit configurations",
      "Usage analytics",
    ],
    limits: {
      kits: 3,
      channels: 10,
      messagesPerMonth: 25000,
    },
    highlighted: true,
  },
  {
    name: "Team",
    plan: "TEAM",
    price: 99,
    description: "For teams that need unlimited automation",
    features: [
      "Unlimited Kits",
      "All messaging channels",
      "100,000 messages per month",
      "Priority support",
      "Custom Kit configurations",
      "Advanced analytics",
      "Team collaboration",
    ],
    limits: {
      kits: 999,
      channels: 999,
      messagesPerMonth: 100000,
    },
  },
];
