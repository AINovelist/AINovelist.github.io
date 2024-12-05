import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface StoryFiltersProps {
  className?: string;
}

export function StoryFilters({ className }: StoryFiltersProps) {
  return (
    <Card className={cn("p-6", className)}>
      <h2 className="mb-4 text-lg font-semibold">فیلتر</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>گروه سنی</Label>
          <Slider defaultValue={[6]} min={3} max={12} step={1} />
        </div>
        {/* Add more filters as needed */}
      </div>
    </Card>
  );
}