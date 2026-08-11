import { z } from "zod";

export const todoIdSchema = z.object({
  id: z.number().int().positive(),
});

export const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(280),
});

export const updateTodoSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().trim().min(1).max(280).optional(),
  completed: z.boolean().optional(),
});
