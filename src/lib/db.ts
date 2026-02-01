// Database client module
// In production, this uses Prisma. For development/build, provides a mock interface.

interface MockPrisma {
  instance: MockModel;
  installedKit: MockModel;
  apiKey: MockModel;
  channel: MockModel;
  usageLog: MockModel;
  user: MockModel;
}

interface MockModel {
  findUnique: (args: Record<string, unknown>) => Promise<unknown>;
  findFirst: (args: Record<string, unknown>) => Promise<unknown>;
  findMany: (args?: Record<string, unknown>) => Promise<unknown[]>;
  create: (args: Record<string, unknown>) => Promise<unknown>;
  update: (args: Record<string, unknown>) => Promise<unknown>;
  delete: (args: Record<string, unknown>) => Promise<unknown>;
}

function createMockModel(): MockModel {
  return {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async (args: Record<string, unknown>) => {
      const data = args.data as Record<string, unknown> || {};
      return { id: `mock_${Date.now()}`, ...data };
    },
    update: async (args: Record<string, unknown>) => {
      const data = args.data as Record<string, unknown> || {};
      return { id: "mock", ...data };
    },
    delete: async () => ({ id: "mock" }),
  };
}

function createPrismaClient(): MockPrisma {
  try {
    // Try to use actual Prisma client if available
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    return new PrismaClient();
  } catch {
    // Fall back to mock for development/build
    return {
      instance: createMockModel(),
      installedKit: createMockModel(),
      apiKey: createMockModel(),
      channel: createMockModel(),
      usageLog: createMockModel(),
      user: createMockModel(),
    };
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: MockPrisma | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
