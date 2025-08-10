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
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all duration-300"
            >
              Ad Astra
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link 
                href="/prompts/fanfic" 
                className="text-gray-300 hover:text-blue-400 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1"
              >
                Fanfic Archive
              </Link>
              <Link 
                href="/prompts/fan-art" 
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1"
              >
                Fan Art Archive
              </Link>
              <Link 
                href="/leaderboard" 
                className="text-gray-300 hover:text-yellow-400 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1"
              >
                Leaderboard
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded p-2"
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
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/prompts/fanfic" 
                  className="text-gray-300 hover:text-blue-400 transition-colors font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fanfic Archive
                </Link>
                <Link 
                  href="/prompts/fan-art" 
                  className="text-gray-300 hover:text-purple-400 transition-colors font-medium py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fan Art Archive
                </Link>
                <Link 
                  href="/leaderboard" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors font-medium py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2"
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
      
      <footer className="border-t border-gray-800 bg-gray-900 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center text-gray-400">
            <p className="mb-6 text-base leading-relaxed max-w-4xl mx-auto">
              Weekly community prompts are run on r/redrising (Fanfic on Monday, Fan Art on Tuesday). 
              Entries are posted on Reddit and linked here through this archive. 
              Prompts close Sunday 18:00 CET/CEST, and a roundup is posted Sunday evening. 
              This site is non-commercial and links to creator posts; content remains on Reddit.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <span className="text-blue-400 font-semibold">Ad Astra</span>
              <span>•</span>
              <span>Non-commercial community archive for</span>
              <a 
                href="https://www.reddit.com/r/redrising" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-orange-400 hover:text-orange-300 transition-colors underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
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