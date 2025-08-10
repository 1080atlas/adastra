'use client'

import Link from 'next/link'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-space bg-stars text-white">
      <header className="border-b border-line bg-card/95 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-crimson/70" aria-hidden />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link 
              href="/" 
              className="font-serif text-xl tracking-wide text-accent hover:text-accent-600 transition-colors"
            >
              Ad Astra
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link 
                href="/prompts/fanfic" 
                className="text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-2 py-1 transition-colors"
              >
                Fanfic Archive
              </Link>
              <Link 
                href="/prompts/fan-art" 
                className="text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-2 py-1 transition-colors"
              >
                Fan Art Archive
              </Link>
              <Link 
                href="/leaderboard" 
                className="text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-2 py-1 transition-colors"
              >
                Leaderboard
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-muted hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 rounded p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-line pt-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/prompts/fanfic" 
                  className="text-muted hover:text-accent transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fanfic Archive
                </Link>
                <Link 
                  href="/prompts/fan-art" 
                  className="text-muted hover:text-accent transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fan Art Archive
                </Link>
                <Link 
                  href="/leaderboard" 
                  className="text-muted hover:text-accent transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leaderboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        {children}
      </main>
      
      <footer className="border-t border-line bg-card mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center text-muted">
            <p className="mb-6 text-base leading-relaxed max-w-4xl mx-auto">
              Weekly community prompts are run on r/redrising (Fanfic on Monday, Fan Art on Tuesday). 
              Entries are posted on Reddit and linked here through this archive. 
              Prompts close Sunday 18:00 CET/CEST, and a roundup is posted Sunday evening. 
              This site is non-commercial and links to creator posts; content remains on Reddit.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <span className="text-accent font-semibold">Ad Astra</span>
              <span>•</span>
              <span>Non-commercial community archive for</span>
              <a 
                href="https://www.reddit.com/r/redrising" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-crimson hover:text-crimson-700 transition-colors underline focus:outline-none focus:ring-2 focus:ring-accent/40 rounded"
              >
                r/redrising
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}