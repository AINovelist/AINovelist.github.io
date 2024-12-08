"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StoryForm } from '@/lib/types';
import { StoryPreview } from '@/components/create/story-preview';
import { StoryFormFields } from '@/components/create/story-form-fields';
import { createStory } from '@/lib/api';
// import { useToast } from '@/components/ui/use-toast';
import { useToast } from '@/hooks/use-toast';

export function StoryCreator() {
  const [form, setForm] = useState<StoryForm>({
    title: '',
    ageRange: [6],
    theme: '',
    characters: '',
    additionalNotes: '',
    childGender: 'boy',
    academicApproaches: [],
    topic: '',
    livingArea: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const result = await createStory(form);
      setGeneratedStory(result);
      toast({
        title: "داستان با موفقیت ساخته شد",
        description: "داستان جدید شما آماده است",
      });
    } catch (error) {
      toast({
        title: "خطا در ساخت داستان",
        description: "لطفاً دوباره تلاش کنید",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">ساخت داستان جدید</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <StoryFormFields form={form} setForm={setForm} disabled={isGenerating} />
            <Button type="submit" className="w-full mt-6" disabled={isGenerating}>
              {isGenerating ? 'در حال ساخت داستان...' : 'ساخت داستان'}
            </Button>
          </form>
        </Card>
        {generatedStory ? (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">داستان شما</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{generatedStory}</p>
            </div>
          </Card>
        ) : (
          <StoryPreview form={form} isLoading={isGenerating} />
        )}
      </div>
    </div>
  );
}