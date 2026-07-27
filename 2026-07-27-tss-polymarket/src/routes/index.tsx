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
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Markets</h1>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
}
