import { z } from 'zod';

export const genreFormSchema = z.object({
  name: z.string().min(1, 'Название не может быть пустым'),
});

export type GenreFormSchema = z.infer<typeof genreFormSchema>;
