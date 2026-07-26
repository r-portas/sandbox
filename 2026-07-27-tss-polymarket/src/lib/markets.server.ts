import { createPublicClient } from "@polymarket/client";

const polymarketClient = createPublicClient();

export async function findOpenMarkets() {
  const pages = polymarketClient.listMarkets({
    closed: false,
    pageSize: 20,
  });

  const firstPage = await pages.firstPage();

  return firstPage.items;
}
