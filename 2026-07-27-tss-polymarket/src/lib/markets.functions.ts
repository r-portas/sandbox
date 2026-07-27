import { createServerFn } from "@tanstack/react-start";

import { findOpenMarkets } from "@/lib/markets.server";

export const fetchMarkets = createServerFn({ method: "GET" }).handler(() =>
  findOpenMarkets(),
);
