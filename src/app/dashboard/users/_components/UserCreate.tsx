'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import toast from 'react-hot-toast';
import { Button } from '@components/ui/button';

import AuthService from '@api/services/AuthService/service';
import UserDialogForm from './UserDialogForm';
import { UserFormSchema, userFormSchema } from './UserFormSchema';

function UserCreate() {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    ['createUser'],
    (data: UserFormSchema) => AuthService.createUser({
      params: { ...data, password: data.password! },
    }),
  );

  const onSubmit: SubmitHandler<UserFormSchema> = async (data) => {
    try {
      await mutateAsync(data);
      toast.success('Пользователь успешно создан');
      document.getElementById('closeDialog')?.click();
      queryClient.refetchQueries(['users']);
    } catch (error) {
      console.log(error);

      toast.error('Что-то пошло не так');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          type="button"
          data-qa-id="user_create_button"
        >
          Создать пользователя
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UserDialogForm
          title="Создания пользователя"
          description={'Внесите данные пользователя. Кликните на кнопку "Создать" для добавления.'}
          footerButtonText="Создать"
          {...form}
          errors={form.formState.errors}
          isLoading={isLoading}
          onSubmit={onSubmit}
          isCreate
        />
      </DialogContent>
    </Dialog>
  );
}

export default UserCreate;
