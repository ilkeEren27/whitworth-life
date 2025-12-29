import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { published: true },
      include: { organizer: { select: { name: true, role: true } } },
      orderBy: { startsAt: "asc" },
    });

    return Response.json({
      success: true,
      events,
      count: events.length,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch events",
        events: [],
      },
      { status: 500 }
    );
  }
}
