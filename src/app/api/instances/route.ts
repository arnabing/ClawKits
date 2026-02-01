/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createInstance, getInstanceHealth } from "@/lib/instance-manager";
import { z } from "zod";

const CreateInstanceSchema = z.object({
  userId: z.string().uuid(),
  kitId: z.string(),
  apiKey: z.string().min(1),
  apiProvider: z.enum(["ANTHROPIC", "OPENAI", "OPENROUTER"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateInstanceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { userId, kitId, apiKey, apiProvider } = parsed.data;

    // Check if user already has an instance
    const existingInstance = await prisma.instance.findFirst({
      where: { userId },
    });

    if (existingInstance) {
      return NextResponse.json(
        { error: "User already has an instance" },
        { status: 409 }
      );
    }

    // Provision the instance
    const details = await createInstance({
      userId,
      kitId,
      apiKey,
      apiProvider,
    });

    // Store in database
    const instance: any = await prisma.instance.create({
      data: {
        userId,
        railwayProjectId: details.projectId,
        status: "PROVISIONING",
        gatewayUrl: details.gatewayUrl,
        gatewayToken: details.gatewayToken,
      },
    });

    // Install the initial kit
    await prisma.installedKit.create({
      data: {
        instanceId: instance.id,
        kitId,
        config: {},
        active: true,
      },
    });

    // Store the API key (encrypted in production)
    await prisma.apiKey.create({
      data: {
        userId,
        provider: apiProvider,
        encryptedKey: apiKey, // TODO: encrypt in production
      },
    });

    return NextResponse.json({ instance }, { status: 201 });
  } catch (error) {
    console.error("Failed to create instance:", error);
    return NextResponse.json(
      { error: "Failed to create instance" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const instance: any = await prisma.instance.findFirst({
      where: { userId },
      include: {
        installedKits: true,
        channels: true,
        usageLogs: {
          orderBy: { date: "desc" },
          take: 30,
        },
      },
    });

    if (!instance) {
      return NextResponse.json({ instance: null });
    }

    // Check health if instance is supposed to be running
    if (instance.status === "RUNNING" && instance.gatewayUrl && instance.gatewayToken) {
      const health = await getInstanceHealth(
        instance.gatewayUrl,
        instance.gatewayToken
      );

      if (!health.healthy && instance.status === "RUNNING") {
        await prisma.instance.update({
          where: { id: instance.id },
          data: { status: "ERROR" },
        });
        instance.status = "ERROR";
      }

      await prisma.instance.update({
        where: { id: instance.id },
        data: { lastHealthCheck: new Date() },
      });
    }

    return NextResponse.json({ instance });
  } catch (error) {
    console.error("Failed to get instance:", error);
    return NextResponse.json(
      { error: "Failed to get instance" },
      { status: 500 }
    );
  }
}
