import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

export interface CountdownProps {
  title: string;
  description?: string;
  targetDate: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({
  title,
  description,
  targetDate,
  ctaText,
  ctaLink,
  backgroundColor,
  textColor,
  buttonColor,
}: CountdownProps) {
  const bgColor = backgroundColor || '#7C3AED';
  const txtColor = textColor || '#FFFFFF';
  const btnColor = buttonColor || '#EA580C';

  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg text-2xl md:text-3xl font-bold"
        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-sm mt-2 opacity-80">{label}</span>
    </div>
  );

  return (
    <section
      className="py-16 px-4"
      style={{
        backgroundColor: bgColor,
        color: txtColor,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-6 w-6" />
          <span className="text-sm font-medium uppercase tracking-wider">Tempo Limitado</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

        {description && (
          <p className="text-lg mb-8 opacity-90">{description}</p>
        )}

        <div className="flex justify-center gap-4 mb-8">
          <TimeBox value={timeLeft.days} label="Dias" />
          <TimeBox value={timeLeft.hours} label="Horas" />
          <TimeBox value={timeLeft.minutes} label="Min" />
          <TimeBox value={timeLeft.seconds} label="Seg" />
        </div>

        <Button
          size="lg"
          asChild
          style={{
            backgroundColor: btnColor,
            borderColor: btnColor,
            color: '#FFFFFF',
          }}
        >
          <a href={ctaLink}>{ctaText}</a>
        </Button>
      </div>
    </section>
  );
}

export default Countdown;
