import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = z.object({
  username: z.string().min(2, {
    message: "O campo deve ter no mínimo 2 caracteres",
  }),
  codigo: z.string().min(2, {
    message: "O campo deve ter no mínimo 2 caracteres",
  }),
});