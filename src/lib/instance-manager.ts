import { generateToken } from "./utils";

interface CreateInstanceOptions {
  userId: string;
  kitId: string;
  apiKey: string;
  apiProvider: string;
}

interface InstanceDetails {
  projectId: string;
  gatewayUrl: string;
  gatewayToken: string;
}

/**
 * Creates a new OpenClaw instance via Railway API.
 * In production, this calls Railway's API to provision a container.
 * For development, returns mock data.
 */
export async function createInstance(
  options: CreateInstanceOptions
): Promise<InstanceDetails> {
  const gatewayToken = generateToken();

  if (process.env.RAILWAY_API_TOKEN) {
    // Production: Create via Railway API
    const project = await createRailwayProject(options.userId);
    const deployment = await deployOpenClaw(project.id, {
      OPENCLAW_GATEWAY_TOKEN: gatewayToken,
      AI_PROVIDER: options.apiProvider,
      AI_API_KEY: options.apiKey,
    });

    return {
      projectId: project.id,
      gatewayUrl: deployment.url,
      gatewayToken,
    };
  }

  // Development: Return mock instance
  return {
    projectId: `mock-${options.userId.slice(0, 8)}`,
    gatewayUrl: `https://mock-instance.railway.app`,
    gatewayToken,
  };
}

export async function getInstanceHealth(
  gatewayUrl: string,
  gatewayToken: string
): Promise<{ healthy: boolean; uptime?: number }> {
  try {
    const response = await fetch(`${gatewayUrl}/health`, {
      headers: { Authorization: `Bearer ${gatewayToken}` },
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) {
      const data = await response.json();
      return { healthy: true, uptime: data.uptime };
    }
    return { healthy: false };
  } catch {
    return { healthy: false };
  }
}

export async function restartInstance(
  projectId: string
): Promise<{ success: boolean }> {
  if (!process.env.RAILWAY_API_TOKEN) {
    return { success: true };
  }

  try {
    await fetch("https://backboard.railway.app/graphql/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: `mutation { serviceInstanceRedeploy(projectId: "${projectId}") }`,
      }),
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteInstance(
  projectId: string
): Promise<{ success: boolean }> {
  if (!process.env.RAILWAY_API_TOKEN) {
    return { success: true };
  }

  try {
    await fetch("https://backboard.railway.app/graphql/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: `mutation { projectDelete(id: "${projectId}") }`,
      }),
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

// Railway API helpers

async function createRailwayProject(
  userId: string
): Promise<{ id: string }> {
  const response = await fetch("https://backboard.railway.app/graphql/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        mutation($input: ProjectCreateInput!) {
          projectCreate(input: $input) { id }
        }
      `,
      variables: {
        input: {
          name: `clawkit-${userId.slice(0, 8)}`,
          teamId: process.env.RAILWAY_TEAM_ID,
        },
      },
    }),
  });

  const data = await response.json();
  return { id: data.data.projectCreate.id };
}

async function deployOpenClaw(
  projectId: string,
  variables: Record<string, string>
): Promise<{ id: string; url: string }> {
  const response = await fetch("https://backboard.railway.app/graphql/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        mutation($input: ServiceCreateInput!) {
          serviceCreate(input: $input) { id }
        }
      `,
      variables: {
        input: {
          projectId,
          name: "openclaw",
          source: {
            image: "ghcr.io/openclaw/openclaw:latest",
          },
          variables,
        },
      },
    }),
  });

  const data = await response.json();
  return {
    id: data.data.serviceCreate.id,
    url: `https://clawkit-${projectId.slice(0, 8)}.up.railway.app`,
  };
}
