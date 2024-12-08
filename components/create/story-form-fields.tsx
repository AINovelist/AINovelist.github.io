"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACADEMIC_APPROACHES, STORY_TOPICS, LIVING_AREAS, StoryForm } from "@/lib/types";

interface StoryFormFieldsProps {
  form: StoryForm;
  setForm: (form: StoryForm) => void;
  disabled?: boolean;
}

export function StoryFormFields({ form, setForm, disabled }: StoryFormFieldsProps) {
  const handleCheckboxChange = (approach: string) => {
    const updatedApproaches = form.academicApproaches.includes(approach)
      ? form.academicApproaches.filter((a) => a !== approach)
      : [...form.academicApproaches, approach];
    setForm({ ...form, academicApproaches: updatedApproaches });
  };

  return (
    <div className="space-y-6">
       <div className="space-y-2">
        <Label htmlFor="characters">شخصیت‌های اصلی</Label>
        <Input
          id="characters"
          value={form.characters}
          onChange={(e) => setForm({ ...form, characters: e.target.value })}
          placeholder="شخصیت‌های داستان را توصیف کنید"
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age-range">رده سنی: {form.ageRange[0]} سال</Label>
        <Slider
          id="age-range"
          value={form.ageRange}
          onValueChange={(value) => setForm({ ...form, ageRange: value })}
          min={3}
          max={12}
          step={1}
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <Label>جنسیت کودک</Label>
        <RadioGroup
          value={form.childGender}
          onValueChange={(value) => setForm({ ...form, childGender: value as 'boy' | 'girl' })}
          className="flex gap-4"
          disabled={disabled}
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="boy" id="boy" />
            <Label htmlFor="boy">پسر</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="girl" id="girl" />
            <Label htmlFor="girl">دختر</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>رویکردهای آموزشی</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACADEMIC_APPROACHES.map((approach) => (
            <div key={approach.id} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={approach.id}
                checked={form.academicApproaches.includes(approach.id)}
                onCheckedChange={() => handleCheckboxChange(approach.id)}
                disabled={disabled}
              />
              <Label htmlFor={approach.id}>{approach.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">موضوع داستان</Label>
        <Select
          value={form.topic}
          onValueChange={(value) => setForm({ ...form, topic: value })}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="موضوع را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {STORY_TOPICS.map((topic) => (
              <SelectItem key={topic.id} value={topic.id}>
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="living-area">محیط زندگی</Label>
        <Select
          value={form.livingArea}
          onValueChange={(value) => setForm({ ...form, livingArea: value })}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="محیط زندگی را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {LIVING_AREAS.map((area) => (
              <SelectItem key={area.id} value={area.id}>
                {area.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>   

      <div className="space-y-2">
        <Label htmlFor="additional-notes">توضیحات اضافی</Label>
        <Textarea
          id="additional-notes"
          value={form.additionalNotes}
          onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
          placeholder="هر توضیح اضافی که می‌خواهید"
          disabled={disabled}
        />
      </div>
    </div>
  );
}