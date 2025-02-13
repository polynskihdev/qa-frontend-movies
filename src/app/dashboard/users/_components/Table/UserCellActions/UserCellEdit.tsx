import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { User } from '@lib/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import AuthService from '@api/services/AuthService/service';
import { UserFormSchema, userFormSchema } from '../../UserFormSchema';
import UserDialogForm from '../../UserDialogForm';

function UserCellEdit(user: User) {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    ['editUser'],
    (data: UserFormSchema) => AuthService.editUser({ params: { ...data, id: user?.id } }),
  );

  const onSubmit: SubmitHandler<UserFormSchema> = async (data) => {
    try {
      await mutateAsync(data);
      toast.success('Данные пользователя изменены');
      document.getElementById('closeDialog')?.click();
      queryClient.refetchQueries(['users']);
    } catch (error) {
      console.log(error);
      toast.error('Произошла ошибка');
    }
  };

  return (
    <UserDialogForm
      title="Редактирование пользователя"
      description={'Измените данные пользователя. Кликните на кнопку "Сохранить" для сохранения изменений.'}
      footerButtonText="Сохранить"
      {...form}
      isLoading={isLoading}
      onSubmit={onSubmit}
      user={user}
      errors={form.formState.errors}
    />
  );
}

export default UserCellEdit;
