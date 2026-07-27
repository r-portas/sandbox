# Polymarket API

This app talks to Polymarket exclusively through the official `@polymarket/client`
SDK (built on top of `@polymarket/bindings` and `@polymarket/types`). It wraps
Polymarket's Gamma (market/event metadata), CLOB (order book/prices), and data
APIs behind one typed client.

All calls in this project use `createPublicClient()`, which needs no
authentication and only exposes read endpoints — no wallet, API key, or
signing is required. Never call `createSecureClient()` (trading, orders,
wallet transfers, perps) from this app; that's a different trust boundary and
out of scope for a read-only display app.

```ts
import { createPublicClient } from "@polymarket/client";

const polymarketClient = createPublicClient();
```

Per `CLAUDE.md`, calls to the client belong in `src/lib/*.server.ts`, wrapped
by a `createServerFn` in the matching `src/lib/*.functions.ts` file. See
`src/lib/markets.server.ts` / `src/lib/markets.functions.ts` for the existing
pattern.

## Pagination

List methods (`listMarkets`, `listEvents`, `listTrades`, `listTags`, ...)
return a `Paginated<T[]>` — not a promise directly:

```ts
const paginator = polymarketClient.listMarkets({ closed: false, pageSize: 20 });

const firstPage = await paginator.firstPage();
// firstPage.items: Market[]
// firstPage.nextCursor

for await (const page of paginator.from(firstPage.nextCursor)) {
  // subsequent pages
}

// or, to walk every page:
for await (const page of paginator) {
  // page.items
}
```

## Discovery actions (markets, events, tags, search)

| Method                           | Returns                            | Notes                                                                                                                            |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `listMarkets(req?)`              | `Paginated<Market[]>`              | Binary markets only — legacy multi-outcome markets are omitted. `closed`, `pageSize`, etc.                                       |
| `fetchMarket(req)`               | `Market`                           | By `id`, `slug`, or `url`.                                                                                                       |
| `fetchMarketTags(req)`           | `TagReference[]`                   | Tags for one market.                                                                                                             |
| `listComboMarkets(req?)`         | `Paginated<ComboMarket[]>`         | Markets tradeable as combos.                                                                                                     |
| `listEvents(req?)`               | `Paginated<Event[]>`               | An event groups related markets (e.g. all candidates in one election). Defaults to open events; `closed: true` for settled ones. |
| `fetchEvent(req)`                | `Event`                            | By `id`, `slug`, or `url`.                                                                                                       |
| `fetchEventTags(req)`            | `TagReference[]`                   | Tags for one event.                                                                                                              |
| `fetchEventLiveVolume(req)`      | `LiveVolume[]`                     | Live volume for an event.                                                                                                        |
| `listSeries(req?)`               | `Paginated<Series[]>`              | Recurring series (e.g. "Fed rate decisions").                                                                                    |
| `fetchSeries(req)`               | `Series`                           | Single series by id.                                                                                                             |
| `listMarketClarifications(req?)` | `Paginated<MarketClarification[]>` | Notes that resolve resolution ambiguity.                                                                                         |
| `listTags(req?)`                 | `Paginated<Tag[]>`                 | Category browsing (Politics, Sports, Crypto, ...).                                                                               |
| `fetchTag(req)`                  | `Tag`                              | By id or slug.                                                                                                                   |
| `fetchRelatedTags(req)`          | `RelatedTag[]`                     | Related-tag relationships.                                                                                                       |
| `fetchRelatedTagResources(req)`  | `Tag[]`                            | Resources linked from related tags.                                                                                              |
| `search(req)`                    | `Paginated<SearchResults>`         | Full-text search — `req.q`. Results include `events`, `tags`, `profiles`.                                                        |
| `listSports()`                   | `SportsMetadata[]`                 | Available sports.                                                                                                                |
| `fetchSportsMarketTypes()`       | `SportsMarketTypesResponse`        | Market types grouped by sport.                                                                                                   |
| `listTeams(req?)`                | `Paginated<Team[]>`                | Sports teams.                                                                                                                    |
| `fetchPublicProfile(req)`        | `PublicProfile \| null`            | By wallet `address`.                                                                                                             |
| `listComments(req)`              | `Paginated<Comment[]>`             | Comments for an event or series (`parentEntityId`, `parentEntityType`).                                                          |
| `fetchCommentsById(req)`         | `Comment[]`                        | A comment thread by id.                                                                                                          |
| `listCommentsByUserAddress(req)` | `Paginated<Comment[]>`             | Comments by a wallet address.                                                                                                    |

## Data actions (prices, order book, trades)

| Method                      | Returns                    | Notes                                                                                          |
| --------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------- |
| `fetchMidpoint(req)`        | `DecimalString`            | Midpoint price for one `tokenId`.                                                              |
| `fetchMidpoints(req)`       | `Midpoints`                | Midpoints for multiple tokens, keyed by token id.                                              |
| `fetchPrice(req)`           | `DecimalString`            | Quoted price for a `tokenId` + `side` (`OrderSide.BUY`/`SELL`).                                |
| `fetchPrices(req)`          | `Prices`                   | Quoted prices for multiple tokens.                                                             |
| `fetchOrderBook(req)`       | `OrderBook`                | Full order book for one `tokenId`.                                                             |
| `fetchOrderBooks(req)`      | `OrderBook[]`              | Order books for multiple tokens.                                                               |
| `fetchSpread(req)`          | `DecimalString`            | Bid/ask spread for one `tokenId`.                                                              |
| `fetchSpreads(req)`         | `Spreads`                  | Spreads for multiple tokens.                                                                   |
| `fetchLastTradePrice(req)`  | `LastTradePrice`           | Last traded price for one `tokenId`.                                                           |
| `fetchLastTradePrices(req)` | `LastTradePriceForToken[]` | Last traded prices for multiple tokens.                                                        |
| `fetchPriceHistory(req)`    | `PriceHistoryPoint[]`      | Historical price series for a `tokenId` — `{ tokenId, interval }`. Good for sparklines/charts. |
| `estimateMarketPrice(req)`  | `number`                   | Estimated fill price a market order would cross at, given current book depth.                  |
| `listOpenInterest(req?)`    | `OpenInterest[]`           | Open interest per market.                                                                      |
| `listMarketHolders(req)`    | `MetaHolder[]`             | Top holders for one or more markets.                                                           |
| `listTrades(req?)`          | `Paginated<Trade[]>`       | Trade history, filterable by `user`, `market`, or event.                                       |

## Rewards / leaderboards

| Method                         | Returns          | Notes                                       |
| ------------------------------ | ---------------- | ------------------------------------------- |
| `listCurrentRewards(req?)`     | `Paginated<...>` | Currently active liquidity-reward programs. |
| `listMarketRewards(req)`       | `Paginated<...>` | Reward info for a market.                   |
| `fetchRewardPercentages(req)`  | —                | Reward percentage breakdown.                |
| `listTraderLeaderboard(req?)`  | `Paginated<...>` | Top traders.                                |
| `listBuilderLeaderboard(req?)` | `Paginated<...>` | Top builders (integrators).                 |

## Out of scope for this app

The SDK also exposes secure/authenticated actions for placing and cancelling
orders, wallet approvals/transfers, perps trading, and RFQ/combo workflows
(`createSecureClient`, `tradingActions`, `walletActions`, `perpsActions`,
`rfqActions`, etc.). This app is read-only and display-focused, so those are
intentionally not used or documented here in depth — see the SDK's own
TypeScript declarations (`node_modules/@polymarket/client/dist/*.d.ts`) if
that ever changes.

## Key data shapes

### `Market` (`src/lib/markets.server.ts` consumes this)

```ts
type Market = {
  id: MarketId;
  slug?: string | null;
  conditionId: CtfConditionId | null;
  question?: string | null;
  groupItemTitle?: string | null;
  description?: string | null;
  category?: string | null;
  image?: string | null;
  icon?: string | null;
  state: MarketState;
  outcomes: { yes: MarketOutcome; no: MarketOutcome };
  metrics: MarketMetrics;
  prices: MarketPrices;
  trading: MarketTrading;
  resolution: MarketResolution;
  rewards: MarketRewards;
  sports: MarketSportsMetadata;
  events: MarketEvent[]; // { id, slug, title } — event(s) this market belongs to
  tags: MarketTag[]; // { id, slug, label }
  positionIds: PositionId[];
};

type MarketMetrics = {
  volume?: DecimalString | null;
  volumeNum?: DecimalString | null;
  volume24hr?: DecimalString | null;
  volume1wk?: DecimalString | null;
  volume1mo?: DecimalString | null;
  volume1yr?: DecimalString | null;
  liquidity?: DecimalString | null;
  liquidityNum?: DecimalString | null;
};

type MarketPrices = {
  bestBid?: DecimalString | null;
  bestAsk?: DecimalString | null;
  lastTradePrice?: DecimalString | null;
  spread?: DecimalString | null;
  oneHourPriceChange?: DecimalString | null;
  oneDayPriceChange?: DecimalString | null;
  oneWeekPriceChange?: DecimalString | null;
  oneMonthPriceChange?: DecimalString | null;
  oneYearPriceChange?: DecimalString | null;
};

type MarketResolution = {
  questionId: QuestionId | null;
  negRiskRequestId: ResolutionRequestId | null;
  umaResolutionStatus: UmaResolutionStatus | null; // e.g. resolving/disputed states
  source?: string | null;
  resolvedBy: EvmAddress | null;
};
```

Currently only `market.metrics.volumeNum`, `market.outcomes.yes/no.price`,
`market.icon`, and `market.question` are rendered
(`src/routes/index.tsx`). `prices.*PriceChange`, `resolution`, `tags`, and
`events` are fetched but unused.

### `Event`

```ts
type Event = {
  id: EventId;
  parentEventId?: EventId | null;
  ticker?: string | null;
  slug?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  category?: string | null;
  subcategory?: string | null;
  image?: string | null;
  icon?: string | null;
  featuredImage?: string | null;
  createdAt?: IsoDateTimeString | null;
  updatedAt?: IsoDateTimeString | null;
  // ...plus metrics, display, trading, resolution, sports metadata, series, tags
};

type EventMetrics = {
  liquidity?: DecimalString | null;
  volume?: DecimalString | null;
  volume24hr?: DecimalString | null;
  openInterest?: DecimalString | null;
  competitive?: number | null;
  commentCount?: number | null;
  tweetCount?: number | null;
};
```

An event is how Polymarket's own site groups multiple related markets under
one card (e.g. one election event containing one market per candidate). This
app currently lists individual markets flat via `listMarkets`, not grouped by
event.

## Type/source reference

- Client entry point: `node_modules/@polymarket/client/dist/index.d.ts`
- Action groups (`DiscoveryActions`, `DataActions`, `PublicRewardsActions`, ...):
  `node_modules/@polymarket/client/dist/types-vvy5wT5V.d.ts`
- Gamma domain types (`Market`, `Event`, `Series`, `Tag`, ...):
  `node_modules/@polymarket/bindings/dist/gamma/index.d.ts`
