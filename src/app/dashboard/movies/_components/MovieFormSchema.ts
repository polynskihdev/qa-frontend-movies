import { Location } from '@lib/types';
import { z } from 'zod';

export const movieFormSchema = z.object({
  name: z.string().min(1, 'Название не может быть пустым'),
  description: z.string().min(1, 'Описание не может быть пустым'),
  price: z.number().min(1, 'Цена должна быть больше нуля'),
  location: z.nativeEnum(Location, { required_error: 'Не может быть пустым' }),
  imageUrl: z.string().url().min(1, 'Ссылка на изображение не может быть пустой'),
  published: z.boolean({ required_error: 'Не может быть пустым' }),
  genreId: z.number().min(1, 'Жанр не может быть пустым'),
});

export type MovieFormSchema = z.infer<typeof movieFormSchema>;
