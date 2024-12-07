import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          قصه‌پرداز: سفر به دنیای داستان‌های جادویی برای کودکان
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
          جرقه‌ای برای تخیل کودک شما، با هر داستانی که هوش مصنوعی خلق می‌کند
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/create">
              <Button size="lg" className="text-lg">
              قصه گو
              </Button>
            </Link>
            <Link href="/library">
              <Button size="lg" variant="outline" className="text-lg">
              کتابخانه
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}