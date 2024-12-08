import { Card } from '@/components/ui/card';
import { StoryForm } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface StoryPreviewProps {
  form: StoryForm;
  isLoading?: boolean;
}

export function StoryPreview({ form, isLoading }: StoryPreviewProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">پیش‌نمایش</h2>
      <div className="space-y-4">
      <div>
          <h3 className="font-medium">شخصیت‌ها</h3>
          <p className="text-muted-foreground">{form.characters || 'شخصیتی تعریف نشده'}</p>
        </div>
        <div>
          <h3 className="font-medium">رده سنی</h3>
          <p className="text-muted-foreground">{form.ageRange[0]} سال</p>
        </div>
        <div>
          <h3 className="font-medium">موضوع</h3>
          <p className="text-muted-foreground">{form.theme || 'تعیین نشده'}</p>
        </div>        
        <div>
          <h3 className="font-medium">توضیحات اضافی</h3>
          <p className="text-muted-foreground">{form.additionalNotes || 'بدون توضیحات'}</p>
        </div>
      </div>
    </Card>
  );
}