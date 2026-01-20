import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
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
  backgroundColor,
  textColor,
  buttonColor,
  backgroundOverlay = true,
  ctaText,
  ctaLink,
  alignment,
  height,
}: HeroProps) {
  const hasCustomBg = backgroundColor && backgroundColor !== '';
  const hasCustomText = textColor && textColor !== '';
  const hasCustomButton = buttonColor && buttonColor !== '';

  return (
    <section
      className={cn(
        'relative flex flex-col justify-center px-4 py-16',
        heightClasses[height],
        alignmentClasses[alignment]
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: !backgroundImage && hasCustomBg ? backgroundColor : undefined,
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{
            color: hasCustomText ? textColor : (backgroundImage || hasCustomBg ? '#FFFFFF' : undefined),
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              'text-lg md:text-xl mb-8 max-w-2xl',
              alignment === 'center' && 'mx-auto'
            )}
            style={{
              color: hasCustomText ? textColor : (backgroundImage || hasCustomBg ? 'rgba(255,255,255,0.9)' : undefined),
              opacity: hasCustomText ? 0.9 : undefined,
            }}
          >
            {subtitle}
          </p>
        )}

        {ctaText && (
          <Button
            size="lg"
            asChild
            style={{
              backgroundColor: hasCustomButton ? buttonColor : undefined,
              borderColor: hasCustomButton ? buttonColor : undefined,
            }}
          >
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        )}
      </div>
    </section>
  );
}

export default Hero;
