import EventForm from "@/components/events/EventForm";

import { prisma } from "@/lib/db";

export default async function EventEditorPage({ params }) {
  const { id } = await params;
  const idValue = id?.[0]; // slug or id
  const event = idValue
    ? await prisma.event.findFirst({
        where: { OR: [{ id: Number(idValue) || -1 }, { slug: idValue }] },
      })
    : null;

  return <EventForm initialEvent={event} />;
}
