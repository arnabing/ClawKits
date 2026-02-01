/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { KITS, getKit } from "@/lib/kits";
import { z } from "zod";

// GET /api/kits - List all available kits
export async function GET() {
  return NextResponse.json({ kits: KITS });
}

// POST /api/kits/install - Install a kit on an instance
const InstallKitSchema = z.object({
  instanceId: z.string().uuid(),
  kitId: z.string(),
  config: z.record(z.unknown()).optional().default({}),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = InstallKitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { instanceId, kitId, config } = parsed.data;

    // Verify kit exists
    const kit = getKit(kitId);
    if (!kit) {
      return NextResponse.json({ error: "Kit not found" }, { status: 404 });
    }

    // Verify instance exists
    const instance: any = await prisma.instance.findUnique({
      where: { id: instanceId },
      include: { installedKits: true },
    });

    if (!instance) {
      return NextResponse.json(
        { error: "Instance not found" },
        { status: 404 }
      );
    }

    // Check if kit is already installed
    const alreadyInstalled = (instance.installedKits || []).some(
      (ik: any) => ik.kitId === kitId
    );

    if (alreadyInstalled) {
      return NextResponse.json(
        { error: "Kit already installed" },
        { status: 409 }
      );
    }

    // Install the kit
    const installedKit = await prisma.installedKit.create({
      data: {
        instanceId,
        kitId,
        config: config,
        active: true,
      },
    });

    // In production: Apply kit configuration to the OpenClaw instance
    // await applyKitConfig(instance.gatewayUrl, instance.gatewayToken, kit);

    return NextResponse.json({ installedKit }, { status: 201 });
  } catch (error) {
    console.error("Failed to install kit:", error);
    return NextResponse.json(
      { error: "Failed to install kit" },
      { status: 500 }
    );
  }
}
