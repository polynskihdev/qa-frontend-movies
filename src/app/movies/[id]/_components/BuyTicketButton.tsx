import { ShoppingCart } from 'lucide-react';

import { Button } from '@components/ui/button';
import { useContext } from 'react';
import { AuthContext } from '@context/AuthProvider';
import { useRouter } from 'next/navigation';

interface BuyTicketButtonProps {
  movieId: number;
  price: number;
}

function BuyTicketButton({ movieId, price }: BuyTicketButtonProps) {
  const { isLogged } = useContext(AuthContext);
  const router = useRouter();

  const onClick = () => {
    router.push(isLogged ? `/payment?movieId=${movieId}` : '/login');
  };

  const priceText = `${price} руб.`;

  return (
    <Button className="gap-3 bg-blue-500 hover:bg-blue-600 w-fit" onClick={onClick} type="button">
      <ShoppingCart className="h-4 w-4" />
      <p>Купить билет</p>
      <p>{priceText}</p>
    </Button>
  );
}

export default BuyTicketButton;
