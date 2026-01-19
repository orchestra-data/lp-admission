import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  title: string;
  items: FAQItem[];
}

export function FAQ({ title, items }: FAQProps) {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>

        <AccordionPrimitive.Root type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <AccordionPrimitive.Item
              key={index}
              value={`item-${index}`}
              className="bg-background border rounded-lg overflow-hidden"
            >
              <AccordionPrimitive.Trigger
                className={cn(
                  'flex w-full items-center justify-between p-4 font-medium transition-all hover:bg-muted/50',
                  '[&[data-state=open]>svg]:rotate-180'
                )}
              >
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
              </AccordionPrimitive.Trigger>
              <AccordionPrimitive.Content
                className={cn(
                  'overflow-hidden text-muted-foreground transition-all',
                  'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
                )}
              >
                <div className="p-4 pt-0">{item.answer}</div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}

export default FAQ;
