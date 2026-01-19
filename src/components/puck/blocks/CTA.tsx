import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant: 'primary' | 'secondary' | 'gradient';
}

const variantClasses = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  gradient: 'bg-gradient-to-r from-primary to-blue-600 text-white',
};

export function CTA({ title, description, buttonText, buttonLink, variant }: CTAProps) {
  return (
    <section className={cn('py-16 px-4', variantClasses[variant])}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 opacity-90">{description}</p>
        <Button
          size="lg"
          variant={variant === 'primary' ? 'secondary' : 'default'}
          asChild
        >
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      </div>
    </section>
  );
}

export default CTA;
