import { Button } from '@components/ui/button';
import {
  Card, CardContent, CardFooter, CardHeader,
} from '@components/ui/card';
import Link from 'next/link';

function UnauthorizedPage() {
  return (
    <div className="w-full h-full mt-36 flex flex-col items-center justify-center">
      <Card className="w-[500px] mx-auto">
        <CardHeader>
          <h2 className="text-xl">Вы не авторизованы для просмотра этой страницы</h2>
        </CardHeader>
        <CardContent>
          <p>Пожалуйста, авторизуйтесь</p>
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <Link href="/login">
            <Button type="button">Войти</Button>
          </Link>
          <Link href="/">
            <Button type="button" variant="ghost" className="mr-3">
              Вернуться на главную
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UnauthorizedPage;
