import './globals.css';
import "../styles/index.css"; 
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { Vazirmatn } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';

const vazirmatn = Vazirmatn({
  subsets: ['latin'],
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'AiNovelist - قصه‌پرداز: سفر به دنیای داستان‌های جادویی برای کودکان',
  description: 'جرقه‌ای برای تخیل کودک شما، با هر داستانی که هوش مصنوعی خلق می‌کند',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans`} suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <GoogleTagManager gtmId="GTM-NFMFJJH5" />
      </body>
    </html>
  );
}