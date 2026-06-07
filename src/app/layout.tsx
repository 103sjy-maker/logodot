import type { Metadata } from 'next';
import { Google_Sans_Flex } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';

// Google Sans Flex — the exact font specified in Figma (variable font, wght 1–1000)
const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  axes: ['GRAD', 'ROND', 'opsz', 'slnt', 'wdth'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Logodot | 로고부터 브랜드아이덴티티까지',
    template: '%s | Logodot',
  },
  description:
    '로고닷은 로고부터 브랜드아이덴티티까지 전략적 디자인으로 브랜드의 본질을 담아냅니다. 대전 기반 브랜드 디자인 전문 스튜디오.',
  keywords: ['로고 디자인', '브랜드 디자인', '브랜드 아이덴티티', 'BI 디자인', '로고닷', 'Logodot'],
  authors: [{ name: 'Logodot' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Logodot',
    title: 'Logodot | 로고부터 브랜드아이덴티티까지',
    description: '로고닷은 로고부터 브랜드아이덴티티까지 전략적 디자인으로 브랜드의 본질을 담아냅니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logodot | 로고부터 브랜드아이덴티티까지',
    description: '로고닷은 로고부터 브랜드아이덴티티까지 전략적 디자인으로 브랜드의 본질을 담아냅니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    'p:domain_verify': '0b5008c9dbbcdaf2057870f299bb5741',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${googleSansFlex.variable} h-full`}>
      <head>
        {/* Pretendard Variable — Korean body & UI text */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
