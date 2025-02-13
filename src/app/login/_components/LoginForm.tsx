'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@components/ui/button';
import {
  Card, CardContent, CardFooter, CardHeader,
} from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import useSession from '@hooks/useSession';

interface LoginInput {
  email: string;
  password: string;
}

function LoginForm() {
  const { signIn, isLogged } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    setIsLoading(true);
    await signIn(data);

    setIsLoading(false);
  };

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);

  return (
    <Card className="w-[500px] mx-auto">
      <CardHeader>
        <h2 className="text-xl">Войти</h2>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full"
              data-qa-id="login_email_input"
              {...register('email', {
                required: true,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Поле email не может быть пустым</p>
            )}
          </div>
          <div className="mt-5">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Пароль"
              className="w-full"
              data-qa-id="login_password_input"
              {...register('password', {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Поле пароль не может быть пустым</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-qa-id="login_submit_button"
          >
            Войти
          </Button>

          <div className="mt-5 text-center">
            <p>
              Нет аккаунта?
              {' '}
              <Link href="/register" className="text-blue-500 underline">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export default LoginForm;
