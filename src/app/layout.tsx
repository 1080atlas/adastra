import type { Metadata } from 'next'
import '@/styles/globals.css'
import { fontSans, fontSerif } from './fonts'

export const metadata: Metadata = {
  title: 'Ad Astra - r/redrising Prompt Archive',
  description: 'Community prompt archive for r/redrising fanfiction and fan art',
  keywords: ['red rising', 'redrising', 'fanfiction', 'fan art', 'prompts', 'pierce brown', 'community'],
  openGraph: {
    title: 'Ad Astra - r/redrising Prompt Archive',
    description: 'Community prompt archive for r/redrising fanfiction and fan art',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Ad Astra - r/redrising Prompt Archive',
    description: 'Community prompt archive for r/redrising fanfiction and fan art',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="font-sans text-ink bg-bg">{children}</body>
    </html>
  )
}