'use client';

import { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@components/ui/button';
import {
  Card, CardContent, CardFooter, CardHeader,
} from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';

import { NODE_ENV } from '@lib/consts';

import { useMutation } from '@tanstack/react-query';
import AuthService from '@api/services/AuthService/service';
import PasswordTooltip from './PasswordTooltip';

const formSchema = z
  .object({
    email: z.string().email('Неверная почта'),
    fullName: z
      .string()
      .min(3, 'Имя должно содержать не менее 2 символов')
      .max(100, 'Имя должно содержать не более 100 символов'),
    password: z
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .max(32, 'Пароль должен содержать не более 32 символов')
      .regex(
        /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d?@#$%^&*_\-+()\[\]{}><\\/\\|"'.,:;]{8,20}$/,
        'Пароль не соответствует требованиям',
      ),
    passwordRepeat: z
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .max(32, 'Пароль должен содержать не более 32 символов')
      .regex(
        /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d?@#$%^&*_\-+()\[\]{}><\\/\\|"'.,:;]{8,20}$/,
        'Пароль не соответствует требованиям',
      ),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ['passwordRepeat'],
    message: 'Введенные пароли не совпадают',
  });

type FormSchema = z.infer<typeof formSchema>;

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
  const router = useRouter();

  const { mutateAsync: registerUser, isLoading } = useMutation(
    ['registerUser'],
    AuthService.register,
  );

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      await registerUser({ params: data });
      if (NODE_ENV === 'production') {
        toast.success('Подтвердите свою почту');
      } else {
        toast.success('Вы зарегистрировались');
      }

      router.push('/login');
    } catch (error: any) {
      if (error.status === 409) {
        toast.error('Пользователь с таким email уже существует');
      } else {
        toast.error('Что-то пошло не так');
      }
    }
  };

  return (
    <Card className="w-[500px] mx-auto">
      <CardHeader>
        <h2 className="text-xl">Регистрация</h2>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div>
            <Label htmlFor="fullName">ФИО</Label>
            <Input
              type="text"
              placeholder="Имя Фамилия Отчество"
              aria-invalid={errors.fullName ? 'true' : 'false'}
              data-qa-id="register_full_name_input"
              {...register('fullName', {
                required: true,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mt-5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              aria-invalid={errors.email ? 'true' : 'false'}
              data-qa-id="register_email_input"
              {...register('email', {
                required: true,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-5">
            <Label htmlFor="password">Пароль</Label>
            <Input
              type="password"
              placeholder="Пароль"
              aria-invalid={errors.password ? 'true' : 'false'}
              data-qa-id="register_password_input"
              {...register('password', {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.password.message}
              </p>
            )}

            <PasswordTooltip />
          </div>

          <div className="mt-5">
            <Label htmlFor="passwordRepeat">Повторите пароль</Label>
            <Input
              type="password"
              placeholder="Повторите пароль"
              {...register('passwordRepeat')}
              data-qa-id="register_password_repeat_input"
            />
            {errors.passwordRepeat && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.passwordRepeat.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-qa-id="register_submit_button"
          >
            Зарегистрироваться
          </Button>
          <p className="mt-5">
            Уже зарегистрированы?
            {' '}
            <Link href="/login" className="text-blue-500 underline">
              Войти
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default RegisterForm;
