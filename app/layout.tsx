import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'BRUME — Пекарня медленного утра',
  description: 'Хрустящая корочка, мягкий свет и время для себя. Авторская выпечка и кофе в пекарне BRUME.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="ru"><body>{children}</body></html>;
}
