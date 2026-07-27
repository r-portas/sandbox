import type { Event, Market } from "@polymarket/client";
import { TrendingDown, TrendingUp } from "lucide-react";

import { formatEndDate, formatPrice, formatPriceChange, formatVolume } from "@/lib/format";

type EventWithoutMetadata = Omit<Event, "metadata">;

const MAX_VISIBLE_MARKETS = 5;

function TrendBadge({ change }: { change: string | null | undefined }) {
  const label = formatPriceChange(change);
  if (!label) return null;

  const isUp = Number(change) > 0;

  return (
    <span
      className={
        isUp
          ? "flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400"
          : "flex items-center gap-0.5 text-destructive"
      }
    >
      {isUp ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
      {label}
    </span>
  );
}

function MarketRow({ market }: { market: Market }) {
  const yesPrice = formatPrice(market.outcomes.yes.price);

  return (
    <div className="flex items-center gap-3 border-t border-border/60 py-2 first:border-t-0">
      <p className="min-w-0 flex-1 truncate text-sm">{market.groupItemTitle ?? market.question}</p>
      <div className="flex shrink-0 items-center gap-2 text-sm font-medium">
        <TrendBadge change={market.prices.oneDayPriceChange} />
        {yesPrice ? (
          <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">Yes {yesPrice}</span>
        ) : null}
      </div>
    </div>
  );
}

export function EventCard({ event }: { event: EventWithoutMetadata }) {
  const markets = event.markets;

  if (markets.length <= 1) {
    const market = markets[0];
    const volume = formatVolume(event.metrics.volume);
    const endDate = formatEndDate(event.schedule.endDate);
    const yesPrice = market ? formatPrice(market.outcomes.yes.price) : null;
    const noPrice = market ? formatPrice(market.outcomes.no.price) : null;
    const yesPercent = market ? Number(market.outcomes.yes.price ?? Number.NaN) * 100 : Number.NaN;

    return (
      <li className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex items-start gap-3">
          {event.icon ? (
            <img src={event.icon} alt="" className="size-11 shrink-0 rounded-full object-cover" />
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="line-clamp-2 leading-snug font-medium">
              {event.title ?? market?.question}
            </p>
            <p className="text-sm text-muted-foreground">
              {[volume ? `${volume} volume` : null, endDate ? `Ends ${endDate}` : null]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>

        {Number.isFinite(yesPercent) ? (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-destructive/20">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${Math.min(100, Math.max(0, yesPercent))}%` }}
            />
          </div>
        ) : null}

        <div className="mt-auto flex items-center gap-2 text-sm font-medium">
          {market ? <TrendBadge change={market.prices.oneDayPriceChange} /> : null}
          <div className="flex flex-1 items-center gap-2">
            {yesPrice ? (
              <span className="flex-1 rounded-md bg-primary/10 px-3 py-1.5 text-center text-primary">
                Yes {yesPrice}
              </span>
            ) : null}
            {noPrice ? (
              <span className="flex-1 rounded-md bg-destructive/10 px-3 py-1.5 text-center text-destructive">
                No {noPrice}
              </span>
            ) : null}
          </div>
        </div>
      </li>
    );
  }

  const volume = formatVolume(event.metrics.volume);
  const endDate = formatEndDate(event.schedule.endDate);
  const sortedMarkets = [...markets].sort(
    (a, b) => Number(b.outcomes.yes.price ?? 0) - Number(a.outcomes.yes.price ?? 0),
  );
  const visibleMarkets = sortedMarkets.slice(0, MAX_VISIBLE_MARKETS);
  const hiddenCount = sortedMarkets.length - visibleMarkets.length;

  return (
    <li className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-4">
        {event.icon ? (
          <img src={event.icon} alt="" className="size-10 shrink-0 rounded-full object-cover" />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate font-medium">{event.title}</p>
          <p className="text-sm text-muted-foreground">
            {[volume ? `${volume} volume` : null, endDate ? `Ends ${endDate}` : null]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-col">
        {visibleMarkets.map((market) => (
          <MarketRow key={market.id} market={market} />
        ))}
        {hiddenCount > 0 ? (
          <p className="border-t border-border/60 pt-2 text-sm text-muted-foreground">
            +{hiddenCount} more
          </p>
        ) : null}
      </div>
    </li>
  );
}
