"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { StoryForm } from '@/lib/types';
import { StoryPreview } from '@/components/create/story-preview';

export function StoryCreator() {
  const [form, setForm] = useState<StoryForm>({
    title: '',
    ageRange: [6],
    theme: '',
    characters: '',
    additionalNotes: '',
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
      <h1 className="mb-8 text-3xl font-bold">قصه‌تان را بسازید</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">قصه</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="قصه شما چه اسمی داشته باشد؟"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age-range">سن: {form.ageRange[0]} ساله</Label>
              <Slider
                id="age-range"
                value={form.ageRange}
                onValueChange={(value) => setForm({ ...form, ageRange: value })}
                min={3}
                max={12}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">موضوع</Label>
              <Input
                id="theme"
                value={form.theme}
                onChange={(e) => setForm({ ...form, theme: e.target.value })}
                placeholder="e.g., Adventure, Friendship, Learning"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="characters">شخصیت اصلی</Label>
              <Input
                id="characters"
                value={form.characters}
                onChange={(e) => setForm({ ...form, characters: e.target.value })}
                placeholder="Describe your characters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-notes">نکات تکمیلی</Label>
              <Textarea
                id="additional-notes"
                value={form.additionalNotes}
                onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                placeholder="Any special requests or additional details"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? 'در حال ساختن قصه' : 'شروع به قصه گویی'}
            </Button>
          </form>
        </Card>
        
        <StoryPreview form={form} />
      </div>
    </div>
  );
}