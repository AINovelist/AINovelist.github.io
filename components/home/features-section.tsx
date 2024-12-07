import { Card } from "@/components/ui/card";
import { BookOpen, Sparkles, Users, Wand2 } from "lucide-react";
import { Feature } from "@/lib/types";
import { FeatureCard } from "@/components/home/feature-card";

const features: Feature[] = [
  {
    name: "اختصاصی برای کودکان",
    description: "با ما به سفری در دنیای قصه‌های جادویی بروید که کاملاً مطابق با نام، سن، و علایق زیست‌محیطی فرزند شما نوشته شده‌اند. این داستان‌ها نه تنها سرگرم‌کننده‌اند، بلکه به کودکان یاد می‌دهند که چگونه از محیط‌زیست خود مراقبت کنند.",
    icon: Wand2,
  },
  {
    name: "با پیام‌های الهام‌بخش و عملی",
    description: "داستان‌های ما کودکان را به قهرمانان محیط‌زیست تبدیل می‌کنند. هر داستان با یک پیام آموزشی و عملی به پایان می‌رسد که کودکان می‌توانند در زندگی روزمره خود از آن استفاده کنند.",
    icon: BookOpen,
  },
  {
    name: "یادگیری و سرگرمی در کنار هم",
    description: "داستان‌هایی که با تخیل کودکان هماهنگ‌اند! از حیوانات سخنگو تا چالش‌های هیجان‌انگیز، قصه‌های ما نه تنها تخیل کودکان را به پرواز درمی‌آورند، بلکه درس‌هایی ارزشمند درباره حفاظت از طبیعت به آنها می‌آموزند.",
    icon: Users,
  },
  {
    name: "شخصی‌سازی‌شده و تعاملی",
    description: "هر داستان سفری است که کودکان شما در آن تصمیم‌گیرنده‌اند. با انتخاب موضوع زیست‌محیطی، کودکان خود را در داستانی قرار دهید که متناسب با نیازهای شناختی و عاطفی آنها طراحی شده است.",
    icon: Sparkles,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          سفری به دنیای ماجراجویی‌های شخصی‌سازی‌شده
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
          با داستان‌هایی که به طور ویژه برای فرزند شما طراحی شده‌اند، همراه شوید. این قصه‌ها نام، سن و پیام‌های مهم زیست‌محیطی را با تخیل کودک ترکیب کرده و او را به دنیای هیجان‌انگیز و آموزنده‌ای دعوت می‌کنند.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.name} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}