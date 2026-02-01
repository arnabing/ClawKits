import { create } from "zustand";
import type { Instance, User, InstalledKit, Channel } from "@/types";

// Mock user for development
const MOCK_USER: User = {
  id: "usr_demo123",
  email: "demo@clawkit.com",
  name: "Demo User",
  avatarUrl: null,
  plan: "PRO",
  stripeCustomerId: null,
  createdAt: new Date().toISOString(),
};

const MOCK_INSTANCE: Instance = {
  id: "inst_demo456",
  userId: "usr_demo123",
  railwayProjectId: "mock-project-123",
  status: "RUNNING",
  gatewayUrl: "https://mock-instance.railway.app",
  gatewayToken: "mock-token",
  createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  lastHealthCheck: new Date(Date.now() - 60000).toISOString(),
  installedKits: [
    {
      id: "ik_1",
      instanceId: "inst_demo456",
      kitId: "morning-briefing",
      config: { briefingTime: "07:00", timezone: "America/New_York" },
      installedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      active: true,
    },
    {
      id: "ik_2",
      instanceId: "inst_demo456",
      kitId: "research-assistant",
      config: { outputFormat: "summary" },
      installedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      active: true,
    },
  ],
  channels: [
    {
      id: "ch_1",
      instanceId: "inst_demo456",
      type: "TELEGRAM",
      config: {},
      status: "CONNECTED",
      connectedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
  ],
};

interface AppState {
  user: User | null;
  instance: Instance | null;
  isLoading: boolean;
  onboardingStep: number;

  setUser: (user: User | null) => void;
  setInstance: (instance: Instance | null) => void;
  setLoading: (loading: boolean) => void;
  setOnboardingStep: (step: number) => void;
  addInstalledKit: (kit: InstalledKit) => void;
  removeInstalledKit: (kitId: string) => void;
  addChannel: (channel: Channel) => void;
  loadMockData: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  instance: null,
  isLoading: false,
  onboardingStep: 0,

  setUser: (user) => set({ user }),
  setInstance: (instance) => set({ instance }),
  setLoading: (isLoading) => set({ isLoading }),
  setOnboardingStep: (onboardingStep) => set({ onboardingStep }),

  addInstalledKit: (kit) =>
    set((state) => {
      if (!state.instance) return state;
      return {
        instance: {
          ...state.instance,
          installedKits: [...(state.instance.installedKits || []), kit],
        },
      };
    }),

  removeInstalledKit: (kitId) =>
    set((state) => {
      if (!state.instance) return state;
      return {
        instance: {
          ...state.instance,
          installedKits: (state.instance.installedKits || []).filter(
            (k) => k.kitId !== kitId
          ),
        },
      };
    }),

  addChannel: (channel) =>
    set((state) => {
      if (!state.instance) return state;
      return {
        instance: {
          ...state.instance,
          channels: [...(state.instance.channels || []), channel],
        },
      };
    }),

  loadMockData: () => set({ user: MOCK_USER, instance: MOCK_INSTANCE }),
}));
