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
        <nav className="mt-8 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <Link href="/about" className="text-sm leading-6 text-foreground hover:text-primary">
              About Us
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/privacy" className="text-sm leading-6 text-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/terms" className="text-sm leading-6 text-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/contact" className="text-sm leading-6 text-foreground hover:text-primary">
              Contact Us
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} AiNovelist. All rights reserved.
        </p>
      </div>
    </footer>
  );
}