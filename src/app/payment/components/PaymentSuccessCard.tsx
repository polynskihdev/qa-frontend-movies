import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';

import {
  Card, CardContent, CardFooter, CardHeader,
} from '@components/ui/card';
import { Button } from '@components/ui/button';

function PaymentSuccessCard() {
  return (
    <Card className="w-[500px]">
      <CardHeader />
      <CardContent className="w-full text-center">
        <CheckCircleIcon className="w-28 h-28 mx-auto text-green-500" />
        <p className="text-xl mt-5">Спасибо за покупку</p>
      </CardContent>
      <CardFooter>
        <Link href="/" className="w-full">
          <Button type="button" className="w-full bg-green-500 hover:bg-green-600">
            Вернуться на главную
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default PaymentSuccessCard;
