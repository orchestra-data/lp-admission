import { cn } from '@/lib/utils';
import { GraduationCap, BookOpen, Award, Star, Users, Zap, Shield, Heart, Target, Lightbulb, Trophy, Rocket } from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  columns: '2' | '3' | '4';
}

const columnClasses = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, BookOpen, Award, Star, Users, Zap, Shield, Heart, Target, Lightbulb, Trophy, Rocket,
};

export function Features({ title, subtitle, features, columns }: FeaturesProps) {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Star;
    return <Icon className="h-10 w-10 text-primary" />;
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className={cn('grid gap-8', columnClasses[columns])}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{getIcon(feature.icon)}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
