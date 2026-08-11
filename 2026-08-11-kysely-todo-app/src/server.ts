import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

import { applyMigrations } from "./lib/db.server";
import { migrationProvider } from "./lib/migrations.server";

// Top-level await, so no request is handled until the schema is up to date. Firing this off
// without awaiting would let early requests race the migration.
await applyMigrations(migrationProvider);

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request);
  },
});
