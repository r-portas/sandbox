import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

/**
 * A SQLite boolean column.
 *
 * @remarks
 * SQLite has no boolean type, so a `boolean` column is really an integer. Writes accept `boolean`
 * and are coerced by the driver, but reads always come back as `0` or `1` — typing the select side
 * as `boolean` would be a lie that `if (row.completed)` happens to survive and
 * `row.completed === true` does not. Convert at the domain boundary instead.
 */
export type SqliteBoolean = ColumnType<0 | 1, boolean, boolean>;

export interface TodoTable {
  id: Generated<number>;

  title: string;
  completed: SqliteBoolean;

  // Unix epoch milliseconds, e.g. `Date.now()`
  createdAt: number;
  // Unix epoch milliseconds; null while the todo is not completed
  completedAt: number | null;
}

export type SelectTodo = Selectable<TodoTable>;
export type InsertTodo = Insertable<TodoTable>;
export type UpdateTodo = Updateable<TodoTable>;

export interface Database {
  todo: TodoTable;
}
