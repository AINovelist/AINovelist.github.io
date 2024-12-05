import { Card } from '@/components/ui/card';
import { Feature } from '@/lib/types';

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card className="p-6 transition-colors hover:bg-accent">
      <feature.icon className="h-12 w-12 text-primary" />
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {feature.name}
      </h3>
      <p className="mt-2 text-muted-foreground">
        {feature.description}
      </p>
    </Card>
  );
}