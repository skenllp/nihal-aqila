import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://nihal-aqila.vercel.app'),
  title: 'Nihal & Aqila · Wedding Invitation · 14 November 2026',
  description: 'Join us as we celebrate the Nikkah of Nihal & Aqila on November 14, 2026 at Town Bank Auditorium, Thalassery.',
  icons: { icon: '/assets/logo-2.png' },
  openGraph: {
    title: 'Nihal & Aqila · Wedding Invitation',
    description: 'Nikkah · 14 November 2026 · Town Bank Auditorium, Thalassery',
    url: 'https://nihal-aqila.vercel.app',
    siteName: 'Nihal & Aqila Wedding',
    images: [{ url: 'https://nihal-aqila.vercel.app/og-image.jpg', width: 1200, height: 630, alt: 'Nihal & Aqila Wedding Invitation' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nihal & Aqila · Wedding Invitation',
    description: 'Nikkah · 14 November 2026 · Town Bank Auditorium, Thalassery',
    images: ['https://nihal-aqila.vercel.app/og-image.jpg'],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Allura&family=Great+Vibes&family=Pinyon+Script&family=Alex+Brush&family=Sedan:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
