"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StoryForm } from "@/lib/types";
import { StoryPreview } from "@/components/create/story-preview";

const environmentalTopicsMap: Record<string, string> = {
  "حفاظت از حیوانات": "Animal Protection",
  "کاهش زباله": "Waste Reduction",
  "صرفه‌جویی در آب": "Water Conservation",
  "حفاظت از درختان": "Tree Preservation",
  "کاهش آلودگی هوا": "Air Pollution Reduction",
};

const livingEnvironmentsMap: Record<string, string> = {
  شهر: "City",
  روستا: "Village",
  "حومه شهر": "Suburbs",
  ساحل: "Coast",
  کوهستان: "Mountainous Area",
};

const transformFormData = (formData: StoryForm) => {
  return {
    title: formData.title,
    sex: formData.sex,
    ageRange: formData.ageRange[0],
    theme: formData.theme,
    characters: formData.characters,
    additionalNotes: formData.additionalNotes,
    environmentalTopic:
      environmentalTopicsMap[formData.environmentalTopic] || "",
    livingEnvironment: livingEnvironmentsMap[formData.livingEnvironment] || "",
  };
};

export function StoryCreator() {
  const [apiResponse, setApiResponse] = useState<{
    aiResponse: string;
    approach: string[];
    git: string | null;
    success: boolean;
  } | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const [form, setForm] = useState<StoryForm>({
    title: "",
    sex: "male",
    ageRange: [6],
    theme: "",
    characters: "",
    additionalNotes: "",
    environmentalTopic: "",
    livingEnvironment: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof StoryForm,
    value: string | number[] | string
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transformedValues = transformFormData(form);
    setIsGenerating(true);

    try {
      const response = await fetch(
        "https://aibots.kharcoin.info/ai-story/build",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedValues),
        }
      );

      const data = await response.json();
      setApiResponse(data);
      setShowPreview(false);
      setResponse(data);
      setForm({
        title: "",
        sex: "male",
        ageRange: [6],
        theme: "",
        characters: "",
        additionalNotes: "",
        environmentalTopic: "",
        livingEnvironment: "",
      });
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse("متاسفانه در ارسال فرم خطایی رخ داد");
    } finally {
      setIsGenerating(false);
    }
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
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="قصه شما چه اسمی داشته باشد؟"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="characters">شخصیت اصلی</Label>
              <Input
                id="characters"
                value={form.characters}
                onChange={(e) =>
                  handleInputChange("characters", e.target.value)
                }
                placeholder="Describe your characters"
              />
            </div>
            <div className="space-y-2">
              <RadioGroup
                label="جنسیت"
                value={form.sex}
                onValueChange={(value) => handleInputChange("sex", value)}
              >
                <RadioGroupItem value="male">پسر</RadioGroupItem>
                <RadioGroupItem value="female">دختر</RadioGroupItem>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age-range">سن: {form.ageRange[0]} ساله</Label>
              <Slider
                id="age-range"
                value={form.ageRange}
                onValueChange={(value) => handleInputChange("ageRange", value)}
                min={3}
                max={11}
                step={1}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="environmental-topic">موضوع زیست محیطی</Label>
                <select
                  id="environmental-topic"
                  value={form.environmentalTopic}
                  onChange={(e) =>
                    handleInputChange("environmentalTopic", e.target.value)
                  }
                  className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">انتخاب کنید</option>
                  {Object.keys(environmentalTopicsMap).map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="living-environment">محیط زندگی</Label>
                <select
                  id="living-environment"
                  value={form.livingEnvironment}
                  onChange={(e) =>
                    handleInputChange("livingEnvironment", e.target.value)
                  }
                  className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">انتخاب کنید</option>
                  {Object.keys(livingEnvironmentsMap).map((environment) => (
                    <option key={environment} value={environment}>
                      {environment}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-notes">نکات تکمیلی</Label>
              <Textarea
                id="additional-notes"
                value={form.additionalNotes}
                onChange={(e) =>
                  handleInputChange("additionalNotes", e.target.value)
                }
                placeholder="Any special requests or additional details"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? "در حال ارسال..." : "شروع به قصه گویی"}
            </Button>
          </form>
        </Card>
        <div>
          {showPreview ? (
            <StoryPreview
              form={form}
              environmentalTopicsMap={environmentalTopicsMap}
              livingEnvironmentsMap={livingEnvironmentsMap}
            />
          ) : (
            <Card className="p-6">
              {apiResponse && apiResponse.aiResponse ? (
                <div className="space-y-4">{apiResponse.aiResponse}</div>
              ) : (
                <div className="space-y-4">No response available</div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
