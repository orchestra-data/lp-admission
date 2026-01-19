import { cn } from '@/lib/utils';
import { Quote, User } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

export function Testimonials({ title, testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>

        <div
          className={cn(
            'grid gap-8',
            testimonials.length === 1
              ? 'max-w-2xl mx-auto'
              : testimonials.length === 2
              ? 'md:grid-cols-2'
              : 'md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-muted/30 rounded-lg p-6 border relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

              <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>

              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
