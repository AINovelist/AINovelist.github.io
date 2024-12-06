import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <div className="flex items-center justify-center space-x-2">
          <BookOpenCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">AiNovelist</span>
        </div>
        <nav className="mt-8 columns-2 sm:flex sm:justify-center sm:space-x-12 mb-6" aria-label="Footer">
            <Link href="/about" className="ml-6 text-sm leading-6 text-foreground hover:text-primary">
              درباره ما
            </Link>
            <Link href="/privacy" className="text-sm leading-6 text-foreground hover:text-primary">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="text-sm leading-6 text-foreground hover:text-primary">
              قوانین
            </Link>
            <Link href="/contact" className="text-sm leading-6 text-foreground hover:text-primary">
              ارتباط
            </Link>
        </nav>
        <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} AiNovelist.
        </p>
      </div>
    </footer>
  );
}