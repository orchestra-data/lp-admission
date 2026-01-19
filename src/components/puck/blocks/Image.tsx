import { cn } from '@/lib/utils';

export interface ImageProps {
  src: string;
  alt: string;
  width: 'auto' | 'full' | 'half';
  rounded: boolean;
}

const widthClasses = {
  auto: 'w-auto',
  full: 'w-full',
  half: 'w-1/2',
};

export function Image({ src, alt, width, rounded }: ImageProps) {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto flex justify-center">
        <img
          src={src}
          alt={alt}
          className={cn(
            'object-cover',
            widthClasses[width],
            rounded && 'rounded-lg'
          )}
        />
      </div>
    </div>
  );
}

export default Image;
