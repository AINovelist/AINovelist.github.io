"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StoryForm } from '@/lib/types';
import { StoryPreview } from '@/components/create/story-preview';
import { StoryFormFields } from '@/components/create/story-form-fields';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // TODO: Implement story generation logic
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Create Your Story</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <StoryFormFields form={form} setForm={setForm} />
            <Button type="submit" className="w-full mt-6" disabled={isGenerating}>
              {isGenerating ? 'Creating Story...' : 'Generate Story'}
            </Button>
          </form>
        </Card>
        <StoryPreview form={form} />
      </div>
    </div>
  );
}