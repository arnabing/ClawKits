import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const ConnectChannelSchema = z.object({
  instanceId: z.string().uuid(),
  type: z.enum(["TELEGRAM", "WHATSAPP", "DISCORD", "SLACK"]),
  config: z.record(z.unknown()).optional().default({}),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ConnectChannelSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { instanceId, type, config } = parsed.data;

    // Verify instance exists
    const instance = await prisma.instance.findUnique({
      where: { id: instanceId },
    });

    if (!instance) {
      return NextResponse.json(
        { error: "Instance not found" },
        { status: 404 }
      );
    }

    // Check for existing channel of same type
    const existing = await prisma.channel.findFirst({
      where: { instanceId, type },
    }) as { id: string } | null;

    if (existing) {
      // Update existing channel
      const updated = await prisma.channel.update({
        where: { id: existing.id },
        data: {
          config,
          status: "CONNECTED",
          connectedAt: new Date(),
        },
      });
      return NextResponse.json({ channel: updated });
    }

    // Create new channel
    const channel = await prisma.channel.create({
      data: {
        instanceId,
        type,
        config,
        status: "CONNECTED",
        connectedAt: new Date(),
      },
    });

    return NextResponse.json({ channel }, { status: 201 });
  } catch (error) {
    console.error("Failed to connect channel:", error);
    return NextResponse.json(
      { error: "Failed to connect channel" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const instanceId = request.nextUrl.searchParams.get("instanceId");

    if (!instanceId) {
      return NextResponse.json(
        { error: "instanceId is required" },
        { status: 400 }
      );
    }

    const channels = await prisma.channel.findMany({
      where: { instanceId },
    });

    return NextResponse.json({ channels });
  } catch (error) {
    console.error("Failed to get channels:", error);
    return NextResponse.json(
      { error: "Failed to get channels" },
      { status: 500 }
    );
  }
}
