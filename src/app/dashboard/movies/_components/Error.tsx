import { Button } from '@components/ui/button';
import { Card, CardFooter, CardHeader } from '@components/ui/card';

interface ErrorProps {
  handleRetry: (...args: any) => void;
}

export function FetchError({ handleRetry }: ErrorProps) {
  return (
    <Card className="w-[450px] mt-36 mx-auto">
      <CardHeader>
        <h2>При выполнении запроса произошла ошибка</h2>
      </CardHeader>

      <CardFooter className="">
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleRetry}>
          Повторить
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FetchError;
