import { createFileRoute } from "@tanstack/react-router";

import { EventCard } from "@/components/event-card";
import { fetchEvents } from "@/lib/events.functions";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: () => fetchEvents(),
});

function RouteComponent() {
  const events = Route.useLoaderData();

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Markets</h1>

      <ul className="flex flex-col gap-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
}
