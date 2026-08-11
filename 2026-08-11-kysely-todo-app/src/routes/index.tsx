import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { createTodoFn, deleteTodoFn, getTodos, updateTodoFn } from "@/lib/todo.functions";

export const Route = createFileRoute("/")({
  loader: () => getTodos(),
  component: RouteComponent,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function RouteComponent() {
  const todos = Route.useLoaderData();
  const router = useRouter();

  const createTodo = useServerFn(createTodoFn);
  const updateTodo = useServerFn(updateTodoFn);
  const deleteTodo = useServerFn(deleteTodoFn);

  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreate(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    try {
      await createTodo({ data: { title: trimmed } });
      setTitle("");
      await router.invalidate({ sync: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggle(id: number, completed: boolean) {
    await updateTodo({ data: { id, completed } });
    await router.invalidate({ sync: true });
  }

  async function handleDelete(id: number) {
    await deleteTodo({ data: { id } });
    await router.invalidate({ sync: true });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Todos</CardTitle>
        <CardDescription>Keep track of what needs doing.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleCreate} className="flex gap-2">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a todo..."
            aria-label="New todo title"
          />
          <Button type="submit" disabled={isSubmitting || !title.trim()}>
            Add
          </Button>
        </form>

        {todos.length === 0 ? (
          <p className="text-sm text-muted-foreground">No todos yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-3">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={(checked) => handleToggle(todo.id, checked === true)}
                  aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={
                      todo.completed ? "text-sm text-muted-foreground line-through" : "text-sm"
                    }
                  >
                    {todo.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Added {dateFormatter.format(todo.createdAt)}
                    {todo.completed && todo.completedAt
                      ? ` · Completed ${dateFormatter.format(todo.completedAt)}`
                      : ""}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete "${todo.title}"`}
                  onClick={() => handleDelete(todo.id)}
                >
                  <Trash2Icon />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
