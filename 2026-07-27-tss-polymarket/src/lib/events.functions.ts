import { createServerFn } from "@tanstack/react-start";

import { findOpenEvents } from "@/lib/events.server";

export const fetchEvents = createServerFn({ method: "GET" }).handler(() => findOpenEvents());
