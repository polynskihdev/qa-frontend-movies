import { cn } from '@lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size: number;
  className?: string;
}

function LoadingSpinner({ size, className }: LoadingSpinnerProps) {
  return (
    <div className={cn('w-full h-full flex items-center justify-center', className)}>
      <Loader2 size={size} color="#000000" className="animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
