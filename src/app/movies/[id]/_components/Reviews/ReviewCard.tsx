import { ReactNode } from 'react';

import { Card, CardContent, CardHeader } from '@components/ui/card';

import { Review } from '@lib/types';
import { cn } from '@lib/utils';

import Rating from '../Rating';

interface ReviewCardProps extends Review {
  actions?: ReactNode;
}

function ReviewCard({
  actions, hidden, rating, text, user: { fullName },
}: ReviewCardProps) {
  return (
    <Card className={cn('w-full', hidden && 'bg-gray-100')}>
      <CardHeader>
        <div className="w-full flex justify-between">
          <h4 className="text-xl w-fit">{fullName}</h4>
          {actions}
        </div>
      </CardHeader>
      <CardContent>
        <p className="overflow-hidden text-ellipsis whitespace-pre-line line-clamp-8">{text}</p>
        <Rating rating={rating} />
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
