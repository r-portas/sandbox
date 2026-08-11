import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("todo")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("completed", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("createdAt", "integer", (col) => col.notNull().defaultTo(sql`(unixepoch() * 1000)`))
    .addColumn("completedAt", "integer")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("todo").execute();
}
