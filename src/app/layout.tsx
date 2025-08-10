import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}