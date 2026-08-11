import { Migration, MigrationProvider } from "kysely/migration";

// Vite statically analyses this glob and inlines every matching module into the server bundle, so
// migrations ship with the build instead of being read off disk at runtime.
const modules = import.meta.glob<unknown>("../migrations/*.ts", { eager: true });

function isMigration(value: unknown): value is Migration {
  return (
    typeof value === "object" && value !== null && typeof (value as Migration).up === "function"
  );
}

/**
 * Supplies the migrations in `src/migrations` from the bundle rather than the filesystem.
 *
 * @remarks
 * Migration names must match what `FileMigrationProvider` produced (the filename without its
 * extension, e.g. `2026-08-11-initial`) — Kysely stores executed names in `kysely_migration` and
 * throws `corrupted migrations` if a previously executed name stops being offered.
 *
 * This module is Vite-only: `import.meta.glob` does not exist under bare Bun, so it must not be
 * imported by anything `bun test` loads.
 */
export const migrationProvider: MigrationProvider = {
  getMigrations() {
    const migrations: Record<string, Migration> = {};

    for (const [filePath, module] of Object.entries(modules)) {
      if (!isMigration(module)) continue;

      const fileName = filePath.slice(filePath.lastIndexOf("/") + 1);
      migrations[fileName.slice(0, fileName.lastIndexOf("."))] = module;
    }

    return Promise.resolve(migrations);
  },
};
