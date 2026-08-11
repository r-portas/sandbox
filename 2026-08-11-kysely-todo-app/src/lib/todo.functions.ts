import { createServerFn } from "@tanstack/react-start";

import { createTodoSchema, todoIdSchema, updateTodoSchema } from "./todo.schemas";
import { createTodo, deleteTodo, listTodos, updateTodo } from "./todo.server";

export const getTodos = createServerFn({ method: "GET" }).handler(() => listTodos());

export const createTodoFn = createServerFn({ method: "POST" })
  .validator(createTodoSchema)
  .handler(({ data }) => createTodo(data));

export const updateTodoFn = createServerFn({ method: "POST" })
  .validator(updateTodoSchema)
  .handler(({ data }) => updateTodo(data));

export const deleteTodoFn = createServerFn({ method: "POST" })
  .validator(todoIdSchema)
  .handler(({ data }) => deleteTodo(data.id));
