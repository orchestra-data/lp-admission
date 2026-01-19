import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  ctaText: string;
  ctaLink: string;
  alignment: 'left' | 'center' | 'right';
  height: 'small' | 'medium' | 'large' | 'full';
}

const heightClasses = {
  small: 'min-h-[300px]',
  medium: 'min-h-[450px]',
  large: 'min-h-[600px]',
  full: 'min-h-screen',
};

const alignmentClasses = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

export function Hero({
  title,
  subtitle,
  backgroundImage,
  backgroundOverlay = true,
  ctaText,
  ctaLink,
  alignment,
  height,
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative flex flex-col justify-center px-4 py-16',
        heightClasses[height],
        alignmentClasses[alignment]
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {backgroundImage && backgroundOverlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      <div
        className={cn(
          'relative z-10 max-w-4xl mx-auto w-full',
          alignment === 'center' && 'mx-auto',
          alignment === 'left' && 'mr-auto',
          alignment === 'right' && 'ml-auto'
        )}
      >
        <h1
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl font-bold mb-6',
            backgroundImage ? 'text-white' : 'text-foreground'
          )}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              'text-lg md:text-xl mb-8 max-w-2xl',
              backgroundImage ? 'text-white/90' : 'text-muted-foreground',
              alignment === 'center' && 'mx-auto'
            )}
          >
            {subtitle}
          </p>
        )}

        {ctaText && (
          <Button size="lg" asChild>
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        )}
      </div>
    </section>
  );
}

export default Hero;
