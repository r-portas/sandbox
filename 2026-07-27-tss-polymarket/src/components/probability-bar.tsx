function ProbabilityBar({ yes }: { yes: number }) {
  const pct = Math.round(Math.min(Math.max(yes, 0), 1) * 100);

  return (
    <div
      className="flex h-1 w-full max-w-32 overflow-hidden bg-muted"
      role="meter"
      aria-label="Yes probability"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="bg-positive" style={{ width: `${pct}%` }} />
      <div className="bg-destructive/70" style={{ width: `${100 - pct}%` }} />
    </div>
  );
}

export { ProbabilityBar };
