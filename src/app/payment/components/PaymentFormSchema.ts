import { z } from 'zod';

export const paymentFormSchema = z.object({
  amount: z.number().min(1, 'Не может быть меньше 1').max(5, 'Не может быть больше 5'),
  card: z.object({
    cardNumber: z
      .string()
      .min(16, 'Номер карты должен содержать 16 цифр')
      .max(16, 'Номер карты должен содержать 16 цифр'),
    cardHolder: z.string().min(1, 'Не может быть пустым'),
    securityCode: z
      .number()
      .min(0, 'CVC должен содержать 3 цифры')
      .max(999, 'CVC должен содержать 3 цифры'),
    expirationMonth: z.string().min(2, 'Месяц должен содержать 2 цифры'),
    expirationYear: z.string().min(2, 'Год должен содержать 2 цифры'),
  }),
});

export type PaymentFormSchema = z.infer<typeof paymentFormSchema>;
