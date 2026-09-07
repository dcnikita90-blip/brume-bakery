import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'BRUME — Пекарня повільного ранку',
  description: 'Хрустка скоринка, м’яке світло та час для себе. Авторська випічка та кава в пекарні BRUME.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="uk"><body>{children}</body></html>;
}
