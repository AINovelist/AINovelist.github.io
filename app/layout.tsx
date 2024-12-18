import './globals.css';
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
  keywords: 'ai, novelist, children, stories, magic, creativity, imagination',
  openGraph: {
    title: 'AiNovelist - قصه‌پرداز',
    description: 'جرقه‌ای برای تخیل کودک شما، با هر داستانی که هوش مصنوعی خلق می‌کند',
    url: 'https://ainovelist.ir',
    siteName: 'AiNovelist',
    images: [
      {
        url: 'https://ainovelist.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AiNovelist Cover Image',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
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