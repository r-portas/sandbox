import { createFileRoute } from "@tanstack/react-router";

import { MarketTicker } from "@/components/market-ticker";
import { ProbabilityBar } from "@/components/probability-bar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="flex min-h-screen flex-col">
      <MarketTicker markets={markets} />

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            polymarket · prediction markets
          </p>
          <h1 className="text-shadow-glow font-heading text-lg font-semibold text-primary sm:text-xl">
            <span className="text-muted-foreground">$</span> ./markets --status=open --limit=
            {markets.length}
            <span className="animate-cursor text-primary">_</span>
          </h1>
        </div>

        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                Market
              </TableHead>
              <TableHead className="hidden w-24 text-right text-[11px] tracking-[0.15em] text-muted-foreground uppercase sm:table-cell">
                Vol
              </TableHead>
              <TableHead className="w-16 text-right text-[11px] tracking-[0.15em] text-muted-foreground uppercase sm:w-24">
                Yes
              </TableHead>
              <TableHead className="w-16 text-right text-[11px] tracking-[0.15em] text-muted-foreground uppercase sm:w-24">
                No
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {markets.map((market) => {
              const volume = formatVolume(market.metrics.volumeNum);
              const yesValue = Number(market.outcomes.yes.price ?? Number.NaN);
              const yesPrice = formatPrice(market.outcomes.yes.price);
              const noPrice = formatPrice(market.outcomes.no.price);

              return (
                <TableRow
                  key={market.id}
                  className="border-l-2 border-l-transparent hover:border-l-primary hover:bg-accent/40"
                >
                  <TableCell className="py-3 align-top whitespace-normal">
                    <div className="flex items-start gap-3">
                      {market.icon ? (
                        <img
                          src={market.icon}
                          alt=""
                          className="size-8 shrink-0 border border-border object-cover"
                        />
                      ) : (
                        <div
                          className="size-8 shrink-0 border border-border bg-muted"
                          aria-hidden="true"
                        />
                      )}

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <p className="line-clamp-2 text-sm font-medium text-pretty">
                          {market.question}
                        </p>
                        {Number.isFinite(yesValue) ? <ProbabilityBar yes={yesValue} /> : null}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden py-3 text-right align-top text-sm text-muted-foreground tabular-nums sm:table-cell">
                    {volume ?? "—"}
                  </TableCell>

                  <TableCell className="py-3 text-right align-top">
                    {yesPrice ? <Badge variant="positive">{yesPrice}</Badge> : null}
                  </TableCell>

                  <TableCell className="py-3 text-right align-top">
                    {noPrice ? <Badge variant="destructive">{noPrice}</Badge> : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <p className="mt-auto pt-4 text-xs text-muted-foreground">
          {markets.length} market{markets.length === 1 ? "" : "s"} · updated moments ago
        </p>
      </div>
    </div>
  );
}
