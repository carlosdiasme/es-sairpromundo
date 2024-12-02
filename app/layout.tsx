import type { Metadata } from "next";
import { Sora } from 'next/font/google';
import { Suspense, lazy } from 'react';
import { GoogleTagManager } from '@next/third-parties/google'
import { AuthProvider } from '@/contexts/AuthContext';
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));

const dmSans = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://en.sairpromundo.com'),
  title: {
    default: 'Sair pro Mundo',
    template: '%s | Sair pro Mundo',
  },
  description: "Explore the world with travel tips, itineraries, and unique experiences.",
  keywords: ['travel', 'tourism', 'travel tips', 'itineraries', 'experiences'],
  authors: [{ name: 'Sair pro Mundo Team' }],
  creator: 'Sair pro Mundo',
  publisher: 'Sair pro Mundo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://en.sairpromundo.com/',
    siteName: 'Sair pro Mundo',
    title: 'Sair pro Mundo',
    description: 'Where do you want to go now? No matter the place, go!',
    images: [
      {
        url: 'https://en.sairpromundo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sair pro Mundo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sairpromundo',
    creator: '@sairpromundo',
    title: 'Sair pro Mundo',
    description: 'Where do you want to go now? No matter the place, go!',
    images: ['https://en.sairpromundo.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Suspense fallback={<div className="sr-only">Loading header...</div>}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Suspense fallback={<div className="sr-only">Loading footer...</div>}>
            <Footer />
          </Suspense>
          <Suspense fallback={null}>
            <CookieBanner />
          </Suspense>
        </AuthProvider>
        <GoogleTagManager gtmId="GTM-5GHQBP8" />
        <SpeedInsights />
      </body>
    </html>
  );
}

