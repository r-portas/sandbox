export function formatVolume(volume: string | null | undefined) {
  const value = Number(volume ?? 0);
  if (!Number.isFinite(value) || value === 0) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPrice(price: string | null | undefined) {
  const value = Number(price ?? Number.NaN);
  if (!Number.isFinite(value)) return null;
  return `${Math.round(value * 100)}¢`;
}

export function formatPriceChange(change: string | null | undefined) {
  const value = Number(change ?? Number.NaN);
  if (!Number.isFinite(value) || Math.round(value * 100) === 0) return null;
  const cents = Math.round(value * 100);
  return `${cents > 0 ? "+" : "−"}${Math.abs(cents)}¢`;
}

export function formatEndDate(date: string | null | undefined) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}
