import { createFileRoute } from "@tanstack/react-router";

import { fetchMarkets } from "@/lib/markets.functions";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: () => fetchMarkets(),
});

function formatVolume(volume: string | null | undefined) {
  const value = Number(volume ?? 0);
  if (!Number.isFinite(value) || value === 0) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPrice(price: string | null | undefined) {
  const value = Number(price ?? Number.NaN);
  if (!Number.isFinite(value)) return null;
  return `${Math.round(value * 100)}¢`;
}

function RouteComponent() {
  const markets = Route.useLoaderData();

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Markets</h1>

      <ul className="flex flex-col gap-3">
        {markets.map((market) => {
          const volume = formatVolume(market.metrics.volumeNum);
          const yesPrice = formatPrice(market.outcomes.yes.price);
          const noPrice = formatPrice(market.outcomes.no.price);

          return (
            <li
              key={market.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              {market.icon ? (
                <img
                  src={market.icon}
                  alt=""
                  className="size-10 shrink-0 rounded-full object-cover"
                />
              ) : null}

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="truncate font-medium">{market.question}</p>
                {volume ? (
                  <p className="text-sm text-muted-foreground">
                    {volume} volume
                  </p>
                ) : null}
              </div>

              <div className="flex shrink-0 gap-2 text-sm font-medium">
                {yesPrice ? (
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
                    Yes {yesPrice}
                  </span>
                ) : null}
                {noPrice ? (
                  <span className="rounded-md bg-destructive/10 px-2 py-1 text-destructive">
                    No {noPrice}
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
