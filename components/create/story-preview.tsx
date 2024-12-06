import { Card } from '@/components/ui/card';
import { StoryForm } from '@/lib/types';

interface StoryPreviewProps {
  form: StoryForm;
}

export function StoryPreview({ form }: StoryPreviewProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">پیش نمایش</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">عنوان</h3>
          <p className="text-muted-foreground">{form.title || 'Untitled Story'}</p>
        </div>
        <div>
          <h3 className="font-medium">رده سنی</h3>
          <p className="text-muted-foreground">{form.ageRange[0]} ساله</p>
        </div>
        <div>
          <h3 className="font-medium">موضع</h3>
          <p className="text-muted-foreground">{form.theme || 'Not specified'}</p>
        </div>
        <div>
          <h3 className="font-medium">شخصیت</h3>
          <p className="text-muted-foreground">{form.characters || 'No characters defined'}</p>
        </div>
        <div>
          <h3 className="font-medium">نکات تکمیلی</h3>
          <p className="text-muted-foreground">{form.additionalNotes || 'No additional notes'}</p>
        </div>
      </div>
    </Card>
  );
}