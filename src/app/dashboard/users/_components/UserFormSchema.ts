import { z } from 'zod';

import { Role } from '@lib/types';

export const userFormSchema = z.object({
  fullName: z.string().min(1, 'ФИО не может быть пустым'),
  email: z.string().email().min(1, 'Описание не может быть пустым'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .max(32, 'Пароль должен содержать не более 32 символов')
    .regex(
      /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d?@#$%^&*_\-+()\[\]{}><\\/\\|"'.,:;]{8,20}$/,
      'Пароль не соответствует требованиям',
    )
    .optional(),
  verified: z.boolean({ required_error: 'Не может быть пустым' }),
  banned: z.boolean({ required_error: 'Не может быть пустым' }),
  roles: z.nativeEnum(Role, { required_error: 'Не может быть пустым' }).array(),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
