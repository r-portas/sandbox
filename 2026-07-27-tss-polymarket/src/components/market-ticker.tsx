import type { fetchMarkets } from "@/lib/markets.functions";

type Market = Awaited<ReturnType<typeof fetchMarkets>>[number];

function shorten(question: string | null | undefined, max = 30) {
  const text = question ?? "";
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function TickerRow({
  markets,
  hidden,
}: {
  markets: Array<{ market: Market; yes: number }>;
  hidden?: boolean;
}) {
  return (
    <div className="flex w-max items-center" aria-hidden={hidden ? "true" : undefined}>
      {markets.map(({ market, yes }, index) => {
        const bullish = yes >= 0.5;
        return (
          <span
            key={`${market.id}-${index}`}
            className="flex items-center gap-2 border-r border-border px-4 py-2 text-xs whitespace-nowrap"
          >
            <span className="text-muted-foreground">{shorten(market.question)}</span>
            <span
              className={
                bullish
                  ? "font-medium text-positive tabular-nums"
                  : "font-medium text-destructive tabular-nums"
              }
            >
              {Math.round(yes * 100)}¢ {bullish ? "▲" : "▼"}
            </span>
          </span>
        );
      })}
    </div>
  );
}

function MarketTicker({ markets }: { markets: Array<Market> }) {
  const items = markets
    .map((market) => ({
      market,
      yes: Number(market.outcomes.yes.price ?? Number.NaN),
    }))
    .filter((item): item is { market: Market; yes: number } => Number.isFinite(item.yes));

  if (items.length === 0) return null;

  return (
    <div
      className="sticky top-0 z-10 flex items-stretch border-b border-border bg-card/90 backdrop-blur"
      role="marquee"
      aria-label="Live market prices"
    >
      <div className="flex shrink-0 items-center gap-1.5 border-r border-border bg-card px-3">
        <span
          className="animate-cursor size-1.5 shrink-0 rounded-full bg-positive"
          aria-hidden="true"
        />
        <span className="font-heading text-[10px] font-semibold tracking-[0.2em] text-positive">
          LIVE
        </span>
      </div>
      <div className="overflow-hidden">
        <div className="animate-ticker flex w-max">
          <TickerRow markets={items} />
          <TickerRow markets={items} hidden />
        </div>
      </div>
    </div>
  );
}

export { MarketTicker };
