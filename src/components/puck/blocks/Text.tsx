import { cn } from '@/lib/utils';

export interface TextProps {
  content: string;
  align: 'left' | 'center' | 'right';
  size: 'sm' | 'base' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function Text({ content, align, size }: TextProps) {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <p className={cn('text-muted-foreground', sizeClasses[size], alignClasses[align])}>
          {content}
        </p>
      </div>
    </div>
  );
}

export default Text;
