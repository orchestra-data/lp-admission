import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string;
  highlighted: boolean;
  ctaText: string;
}

export interface PricingProps {
  title: string;
  subtitle?: string;
  plans: Plan[];
}

export function Pricing({ title, subtitle, plans }: PricingProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
        </div>

        <div
          className={cn(
            'grid gap-8',
            plans.length === 1
              ? 'max-w-md mx-auto'
              : plans.length === 2
              ? 'md:grid-cols-2 max-w-4xl mx-auto'
              : 'md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {plans.map((plan, index) => {
            const features = plan.features.split('\n').filter(Boolean);

            return (
              <div
                key={index}
                className={cn(
                  'rounded-lg border p-6 flex flex-col',
                  plan.highlighted
                    ? 'border-primary shadow-lg scale-105 bg-primary/5'
                    : 'bg-background'
                )}
              >
                {plan.highlighted && (
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Mais Popular
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className="w-full"
                  asChild
                >
                  <a href="#form">{plan.ctaText}</a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
