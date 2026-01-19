import { cn } from '@/lib/utils';

export interface SpacerProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-4',
  md: 'h-8',
  lg: 'h-16',
  xl: 'h-24',
};

export function Spacer({ size }: SpacerProps) {
  return <div className={cn(sizeClasses[size])} aria-hidden="true" />;
}

export default Spacer;
