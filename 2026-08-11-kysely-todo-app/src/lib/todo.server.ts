import { db } from "./db.server";
import { InsertTodo, SelectTodo, UpdateTodo } from "./db.types";

/**
 * A todo as the rest of the app sees it, with `completed` as a real boolean.
 */
export interface Todo extends Omit<SelectTodo, "completed"> {
  completed: boolean;
}

// SQLite returns `completed` as 0/1, so widen it back to a boolean before it leaves this module.
function toTodo(row: SelectTodo): Todo {
  return { ...row, completed: Boolean(row.completed) };
}

/**
 * Lists all todos, most recently created first.
 */
export async function listTodos(): Promise<Todo[]> {
  const rows = await db.selectFrom("todo").selectAll().orderBy("createdAt", "desc").execute();
  return rows.map(toTodo);
}

/**
 * Fetches a single todo by id, or `undefined` if it doesn't exist.
 */
export async function getTodo(id: number): Promise<Todo | undefined> {
  const row = await db.selectFrom("todo").selectAll().where("id", "=", id).executeTakeFirst();
  return row ? toTodo(row) : undefined;
}

/**
 * Creates a new, incomplete todo.
 */
export async function createTodo(input: Pick<InsertTodo, "title">): Promise<Todo> {
  const row = await db
    .insertInto("todo")
    .values({
      title: input.title,
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return toTodo(row);
}

/**
 * Updates a todo's title and/or completion state.
 *
 * @remarks
 * Toggling `completed` stamps or clears `completedAt` to match.
 */
export async function updateTodo(
  input: { id: number } & Pick<UpdateTodo, "title" | "completed">,
): Promise<Todo> {
  const completedAt = input.completed ? Date.now() : null;

  const row = await db
    .updateTable("todo")
    .set({
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.completed !== undefined ? { completed: input.completed, completedAt } : {}),
    })
    .where("id", "=", input.id)
    .returningAll()
    .executeTakeFirstOrThrow();

  return toTodo(row);
}

/**
 * Deletes a todo by id.
 */
export async function deleteTodo(id: number) {
  await db.deleteFrom("todo").where("id", "=", id).execute();
}
