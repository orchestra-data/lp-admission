import { cn } from '@/lib/utils';

interface Logo {
  name: string;
  imageUrl: string;
}

export interface LogoCloudProps {
  title?: string;
  subtitle?: string;
  logos: Logo[];
  grayscale: boolean;
}

export function LogoCloud({ title, subtitle, logos, grayscale }: LogoCloudProps) {
  return (
    <section className="py-12 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>}
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.imageUrl}
              alt={logo.name}
              className={cn(
                'h-8 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity',
                grayscale && 'grayscale hover:grayscale-0'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoCloud;
