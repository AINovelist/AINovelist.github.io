import {
  Card,
  CardBackground,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StoryForm } from "@/lib/types";

interface StoryPreviewProps {
  form: StoryForm;
  environmentalTopicsMap: Record<string, string>;
  livingEnvironmentsMap: Record<string, string>;
}

// export function StoryPreview({ form }: StoryPreviewProps) {
//   return (
//     <Card className="p-6">
//       <h2 className="mb-4 text-xl font-semibold">پیش نمایش</h2>
//       <div className="space-y-4">
//         <div>
//           <h3 className="font-medium">عنوان</h3>
//           <p className="text-muted-foreground">{form.title || 'قصه'}</p>
//         </div>
//         <div>
//           <h3 className="font-medium">جنسیت</h3>
//           <p className="text-muted-foreground">
//             {form.sex === 'male' ? 'پسر' : form.sex === 'female' ? 'دختر' : 'نامشخص'}
//           </p>
//         </div>
//         <div>
//           <h3 className="font-medium">رده سنی</h3>
//           <p className="text-muted-foreground">{form.ageRange[0]} ساله</p>
//         </div>
//         <div>
//           <h3 className="font-medium">موضوع زیست محیطی</h3>
//           <p className="text-muted-foreground">
//             {form.environmentalTopic
//               ? environmentalTopicsMap[form.environmentalTopic] || 'نامعلوم'
//               : 'نامعلوم'}
//           </p>
//         </div>
//         <div>
//           <h3 className="font-medium">محیط زندگی</h3>
//           <p className="text-muted-foreground">
//             {form.livingEnvironment
//               ? livingEnvironmentsMap[form.livingEnvironment] || 'نامعلوم'
//               : 'نامعلوم'}
//           </p>
//         </div>
//         <div>
//           <h3 className="font-medium">موضوع</h3>
//           <p className="text-muted-foreground">{form.theme || 'نامعلوم'}</p>
//         </div>
//         <div>
//           <h3 className="font-medium">شخصیت</h3>
//           <p className="text-muted-foreground">{form.characters || 'بدون شخصیت'}</p>
//         </div>
//         <div>
//           <h3 className="font-medium">نکات تکمیلی</h3>
//           <p className="text-muted-foreground">{form.additionalNotes || 'بدون یادداشت اضافه'}</p>
//         </div>
//       </div>
//     </Card>
//   );
// }

export function StoryPreview({
  form,
  environmentalTopicsMap,
  livingEnvironmentsMap,
}: StoryPreviewProps) {
  return (
    <Card className="p-6">
      <CardBackground
        style={{
          backgroundImage:
            "url(https://github.com/AINovelist/stories/blob/main/kids/Tree%20Preservation/images/nazanin-10-in-mountainous-area-7657810281-vector_art.png?raw=true)",
        }}
      />
      <CardContent>
        <h3 className="font-medium">پیش نمایش </h3>
        <div className="space-y-4">
          {/* ... */}
          <div>
            <h3 className="font-medium">عنوان</h3>
            <p className="text-muted-foreground">{form.title || "قصه"}</p>
          </div>
          <div>
            <h3 className="font-medium">جنسیت</h3>
            <p className="text-muted-foreground">
              {form.sex === "male"
                ? "پسر"
                : form.sex === "female"
                ? "دختر"
                : "نامشخص"}
            </p>
          </div>
          <div>
            <h3 className="font-medium">رده سنی</h3>{" "}
            <p className="text-muted-foreground">{form.ageRange[0]} ساله</p>
          </div>
          <div>
            <h3 className="font-medium">موضوع زیست محیطی</h3>
            <p className="text-muted-foreground">
              {form.environmentalTopic
                ? environmentalTopicsMap[form.environmentalTopic] || "نامعلوم"
                : "نامعلوم"}
            </p>
          </div>
          <div>
            <h3 className="font-medium">محیط زندگی</h3>
            <p className="text-muted-foreground">
              {form.livingEnvironment
                ? livingEnvironmentsMap[form.livingEnvironment] || "نامعلوم"
                : "نامعلوم"}
            </p>
          </div>
          {/* ... */}
        </div>
      </CardContent>
    </Card>
  );
}
