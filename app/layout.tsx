import type { Metadata } from "next";
import { Sora } from 'next/font/google';
import { Suspense, lazy } from 'react';
import { GoogleTagManager } from '@next/third-parties/google'
import "./globals.css";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

const dmSans = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sairpromundo.com'),
  title: {
    default: 'Sair pro Mundo',
    template: '%s',
  },
  description: "Explore o mundo com dicas de viagem, roteiros e experiências únicas.",
  keywords: ['viagem', 'turismo', 'dicas de viagem', 'roteiros', 'experiências'],
  authors: [{ name: 'Equipe Sair pro Mundo' }],
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
    locale: 'pt_BR',
    url: 'https://www.sairpromundo.com/',
    siteName: 'Sair pro Mundo',
    title: 'Sair pro Mundo',
    description: 'Para onde quer ir agora? Não importa o lugar, vá!',
    images: [
      {
        url: 'https://www.sairpromundo.com/og-image.jpg',
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
    description: 'Para onde quer ir agora? Não importa o lugar, vá!',
    images: ['https://www.sairpromundo.com/twitter-image.jpg'],
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
    <html lang="pt-BR" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Carregando cabeçalho...</div>}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <Suspense fallback={<div>Carregando rodapé...</div>}>
          <Footer />
        </Suspense>
        <GoogleTagManager gtmId="GTM-5GHQBP8" />
      </body>
    </html>
  );
}