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
  metadataBase: new URL('https://es.sairpromundo.com'),
  title: {
    default: 'Sair pro Mundo | Descubre lugares increíbles',
    template: '%s | Sair pro Mundo',
  },
  description: "Explora el mundo con consejos de viaje, itinerarios y experiencias únicas.",
  keywords: ['viaje', 'turismo', 'consejos de viaje', 'itinerarios', 'experiencias'],
  authors: [{ name: 'Equipo de Sair pro Mundo' }],
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
    locale: 'es_ES',
    url: 'https://es.sairpromundo.com/',
    siteName: 'Sair pro Mundo',
    title: 'Sair pro Mundo',
    description: '¿A dónde quieres ir ahora? No importa el lugar, ¡ve!',
    images: [
      {
        url: 'https://es.sairpromundo.com/og-image.jpg',
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
    description: '¿A dónde quieres ir ahora? No importa el lugar, ¡ve!',
    images: ['https://es.sairpromundo.com/twitter-image.jpg'],
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
    <html lang="es" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Suspense fallback={<div className="sr-only">Cargando encabezado...</div>}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Suspense fallback={<div className="sr-only">Cargando pie de página...</div>}>
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

