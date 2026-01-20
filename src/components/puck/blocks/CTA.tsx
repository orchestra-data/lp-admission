import { Button } from '@/components/ui/button';

export interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
}

export function CTA({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundColor,
  textColor,
  buttonColor,
}: CTAProps) {
  const bgColor = backgroundColor || '#2563EB';
  const txtColor = textColor || '#FFFFFF';
  const btnColor = buttonColor || '#EA580C';

  return (
    <section
      className="py-16 px-4"
      style={{
        backgroundColor: bgColor,
        color: txtColor,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 opacity-90">{description}</p>
        <Button
          size="lg"
          asChild
          style={{
            backgroundColor: btnColor,
            borderColor: btnColor,
            color: '#FFFFFF',
          }}
        >
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      </div>
    </section>
  );
}

export default CTA;
