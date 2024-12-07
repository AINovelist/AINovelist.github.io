import { Card } from '@/components/ui/card';
import { StoryForm } from '@/lib/types';

interface StoryPreviewProps {
  form: StoryForm;
}

export function StoryPreview({ form }: StoryPreviewProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Preview</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Title</h3>
          <p className="text-muted-foreground">{form.title || 'Untitled Story'}</p>
        </div>
        <div>
          <h3 className="font-medium">Age Range</h3>
          <p className="text-muted-foreground">{form.ageRange[0]} years old</p>
        </div>
        <div>
          <h3 className="font-medium">Theme</h3>
          <p className="text-muted-foreground">{form.theme || 'Not specified'}</p>
        </div>
        <div>
          <h3 className="font-medium">Characters</h3>
          <p className="text-muted-foreground">{form.characters || 'No characters defined'}</p>
        </div>
        <div>
          <h3 className="font-medium">Additional Notes</h3>
          <p className="text-muted-foreground">{form.additionalNotes || 'No additional notes'}</p>
        </div>
      </div>
    </Card>
  );
}