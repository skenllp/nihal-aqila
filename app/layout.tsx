import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Mashoor & Mirza · Wedding Invitation · 25 July 2026',
  description: 'Join us as we celebrate the wedding of Mashoor & Mirza on July 25, 2026 at Mehfil Auditorium, Kuttiyadi.',
  icons: { icon: '/assets/logo-2.png' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
