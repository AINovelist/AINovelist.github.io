import { Card } from '@/components/ui/card';
import { BookOpen, Sparkles, Users, Wand2 } from 'lucide-react';
import { Feature } from '@/lib/types';
import { FeatureCard } from '@/components/home/feature-card';

const features: Feature[] = [
  {
    name: 'AI-Powered Stories',
    description: 'Create unique stories tailored to your child\'s interests and age',
    icon: Wand2,
  },
  {
    name: 'Educational Content',
    description: 'Stories that both entertain and teach valuable lessons',
    icon: BookOpen,
  },
  {
    name: 'Personalized Characters',
    description: 'Customize characters to reflect your child\'s world',
    icon: Users,
  },
  {
    name: 'Interactive Elements',
    description: 'Engage children with interactive story elements',
    icon: Sparkles,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Unleash Your Child's Imagination
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Create magical stories that inspire, educate, and entertain
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.name} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}