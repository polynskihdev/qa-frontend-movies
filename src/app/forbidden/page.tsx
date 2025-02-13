import { Button } from '@components/ui/button';
import { Card, CardFooter, CardHeader } from '@components/ui/card';
import Link from 'next/link';

function ForbiddenPage() {
  return (
    <div className="w-full h-full mt-36 flex flex-col items-center justify-center">
      <Card className="w-[500px] mx-auto">
        <CardHeader>
          <h2 className="text-xl">У вас нет доступа к этой странице</h2>
        </CardHeader>
        <CardFooter className="flex flex-row-reverse">
          <Link href="/">
            <Button type="button">Вернуться на главную</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForbiddenPage;
