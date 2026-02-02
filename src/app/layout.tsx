import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | PromptOptimizer',
    default: 'PromptOptimizer - AI 프롬프트 최적화 도구',
  },
  description: 'OpenAI(GPT), Claude, Gemini 모델에 맞춰 프롬프트를 자동으로 최적화해주는 무료 도구입니다. 서버 전송 없이 안전하게 브라우저에서 실행됩니다.',
  applicationName: 'PromptOptimizer',
  keywords: ['Prompt Engineering', 'LLM', 'ChatGPT', 'Claude', 'Gemini', '프롬프트 최적화', 'AI Tools', '프롬프트 엔지니어링'],
  authors: [{ name: 'Antigravity Team' }],
  creator: 'Antigravity',
  publisher: 'Antigravity Project',
  metadataBase: new URL('https://prompt-optimizer.vercel.app'), // Replace with actual domain deployment
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PromptOptimizer - AI 프롬프트 최적화 도구',
    description: '서버 전송 없이 브라우저에서 안전하게. 나의 프롬프트를 전문가 수준으로 업그레이드하세요.',
    url: 'https://prompt-optimizer.vercel.app',
    siteName: 'PromptOptimizer',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptOptimizer - AI 프롬프트 최적화',
    description: 'OpenAI, Claude, Gemini 맞춤형 프롬프트 최적화 도구',
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

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; img-src 'self' data: https://www.google-analytics.com;"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-PLACEHOLDER" />
    </html>
  );
}
