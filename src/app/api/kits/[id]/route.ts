import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getKit } from "@/lib/kits";

// GET /api/kits/[id] - Get kit details
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const kit = getKit(params.id);

  if (!kit) {
    return NextResponse.json({ error: "Kit not found" }, { status: 404 });
  }

  return NextResponse.json({ kit });
}

// DELETE /api/kits/[id] - Uninstall a kit (id = installedKit.id)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const installedKit = await prisma.installedKit.findUnique({
      where: { id: params.id },
    });

    if (!installedKit) {
      return NextResponse.json(
        { error: "Installed kit not found" },
        { status: 404 }
      );
    }

    await prisma.installedKit.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to uninstall kit:", error);
    return NextResponse.json(
      { error: "Failed to uninstall kit" },
      { status: 500 }
    );
  }
}

// PATCH /api/kits/[id] - Update kit config
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { config, active } = body;

    const installedKit = await prisma.installedKit.findUnique({
      where: { id: params.id },
    });

    if (!installedKit) {
      return NextResponse.json(
        { error: "Installed kit not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.installedKit.update({
      where: { id: params.id },
      data: {
        ...(config !== undefined && { config }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json({ installedKit: updated });
  } catch (error) {
    console.error("Failed to update kit:", error);
    return NextResponse.json(
      { error: "Failed to update kit" },
      { status: 500 }
    );
  }
}
