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
}

export function StoryFormFields({ form, setForm }: StoryFormFieldsProps) {
  const handleCheckboxChange = (approach: string) => {
    const updatedApproaches = form.academicApproaches.includes(approach)
      ? form.academicApproaches.filter((a) => a !== approach)
      : [...form.academicApproaches, approach];
    setForm({ ...form, academicApproaches: updatedApproaches });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Story Title</Label>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter a title for your story"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age-range">Age Range: {form.ageRange[0]} years</Label>
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
        <Label>Child Gender</Label>
        <RadioGroup
          value={form.childGender}
          onValueChange={(value) => setForm({ ...form, childGender: value as 'boy' | 'girl' })}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="boy" id="boy" />
            <Label htmlFor="boy">Boy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="girl" id="girl" />
            <Label htmlFor="girl">Girl</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Academic Approaches</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACADEMIC_APPROACHES.map((approach) => (
            <div key={approach.id} className="flex items-center space-x-2">
              <Checkbox
                id={approach.id}
                checked={form.academicApproaches.includes(approach.id)}
                onCheckedChange={() => handleCheckboxChange(approach.id)}
              />
              <Label htmlFor={approach.id}>{approach.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">Story Topic</Label>
        <Select
          value={form.topic}
          onValueChange={(value) => setForm({ ...form, topic: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
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
        <Label htmlFor="living-area">Living Area</Label>
        <Select
          value={form.livingArea}
          onValueChange={(value) => setForm({ ...form, livingArea: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select living area" />
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
        <Label htmlFor="characters">Main Characters</Label>
        <Input
          id="characters"
          value={form.characters}
          onChange={(e) => setForm({ ...form, characters: e.target.value })}
          placeholder="Describe your characters"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-notes">Additional Notes</Label>
        <Textarea
          id="additional-notes"
          value={form.additionalNotes}
          onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
          placeholder="Any special requests or additional details"
        />
      </div>
    </div>
  );
}