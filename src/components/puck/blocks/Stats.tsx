import { cn } from '@/lib/utils';

interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface StatsProps {
  title?: string;
  stats: Stat[];
  columns: '2' | '3' | '4';
  customBgColor?: string;
  customTextColor?: string;
}

const columnClasses = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
};

export function Stats({ title, stats, columns, customBgColor, customTextColor }: StatsProps) {
  const bgColor = customBgColor || '#2563EB';
  const textColor = customTextColor || '#FFFFFF';

  return (
    <section
      className="py-16 px-4"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        )}

        <div className={cn('grid gap-8 text-center', columnClasses[columns])}>
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-lg" style={{ opacity: 0.85 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
