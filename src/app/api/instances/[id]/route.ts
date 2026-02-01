/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { restartInstance, deleteInstance } from "@/lib/instance-manager";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const instance = await prisma.instance.findUnique({
      where: { id: params.id },
      include: {
        installedKits: true,
        channels: true,
      },
    });

    if (!instance) {
      return NextResponse.json({ error: "Instance not found" }, { status: 404 });
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { action } = body;

    const instance: any = await prisma.instance.findUnique({
      where: { id: params.id },
    });

    if (!instance) {
      return NextResponse.json({ error: "Instance not found" }, { status: 404 });
    }

    if (action === "restart") {
      if (!instance.railwayProjectId) {
        return NextResponse.json(
          { error: "No project ID" },
          { status: 400 }
        );
      }

      const result = await restartInstance(instance.railwayProjectId);
      if (!result.success) {
        return NextResponse.json(
          { error: "Failed to restart" },
          { status: 500 }
        );
      }

      await prisma.instance.update({
        where: { id: params.id },
        data: { status: "PROVISIONING" },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Failed to update instance:", error);
    return NextResponse.json(
      { error: "Failed to update instance" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const instance: any = await prisma.instance.findUnique({
      where: { id: params.id },
    });

    if (!instance) {
      return NextResponse.json({ error: "Instance not found" }, { status: 404 });
    }

    if (instance.railwayProjectId) {
      await deleteInstance(instance.railwayProjectId);
    }

    await prisma.instance.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete instance:", error);
    return NextResponse.json(
      { error: "Failed to delete instance" },
      { status: 500 }
    );
  }
}
