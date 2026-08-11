import { Database as SqliteDatabase } from "bun:sqlite";

import { Kysely } from "kysely";
import { BunSqliteDialect } from "kysely-bun-sqlite";
import { MigrationProvider, Migrator } from "kysely/migration";

import { Database } from "./db.types";

const DB_FILENAME = "todo.db";

export const db = new Kysely<Database>({
  dialect: new BunSqliteDialect({
    database: new SqliteDatabase(DB_FILENAME, { create: true }),
  }),
});

/**
 * Applies any pending migrations from `provider`, in name order.
 *
 * @param provider - Supplies the migrations to run. Injected rather than constructed here so this
 * module stays free of bundler-specific code and remains importable under `bun test`.
 *
 * @remarks
 * Throws if any migration fails, so a bad deploy stops at startup rather than serving requests
 * against a half-migrated schema.
 */
export async function applyMigrations(provider: MigrationProvider) {
  const migrator = new Migrator({ db, provider });

  const { results, error } = await migrator.migrateToLatest();

  for (const result of results ?? []) {
    console.log(`Migration ${result.migrationName}: ${result.status}`);
  }

  if (error) {
    throw error;
  }
}
