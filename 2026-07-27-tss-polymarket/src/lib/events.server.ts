import { createPublicClient } from "@polymarket/client";

const polymarketClient = createPublicClient();

export async function findOpenEvents() {
  const pages = polymarketClient.listEvents({
    closed: false,
    order: "volume",
    ascending: false,
    pageSize: 20,
  });

  const firstPage = await pages.firstPage();

  // `metadata` is an arbitrary, untyped bag that TanStack Start's server-fn
  // serializer can't verify is serializable, and it's unused by the UI.
  return firstPage.items.map(({ metadata: _metadata, ...event }) => event);
}
